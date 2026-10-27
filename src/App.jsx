import { useMemo, useState } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import CourseCatalog from './components/CourseCatalog';
import MySchedule from './components/MySchedule';
import AddCourseModal from './components/AddCourseModal';
import Toast from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SEED_COURSES } from './data/seedCourses';
import {
  CREDIT_LIMIT_MESSAGE,
  MAX_CREDITS_PER_STUDENT,
  hasFreeSeats,
} from './utils/registrationRules';

export default function App() {
  const [courses, setCourses] = useLocalStorage('crs:courses', SEED_COURSES);
  const [enrolledIds, setEnrolledIds] = useLocalStorage('crs:enrollments', []);

  const [activeTab, setActiveTab] = useState('catalog');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [availability, setAvailability] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [toast, setToast] = useState(null);

  const enrolledSet = useMemo(() => new Set(enrolledIds), [enrolledIds]);

  const enrolled = useMemo(
    () => courses.filter((course) => enrolledSet.has(course.id)),
    [courses, enrolledSet]
  );

  const totalCredits = enrolled.reduce((sum, course) => sum + course.credits, 0);

  const departments = useMemo(
    () => [...new Set(courses.map((course) => course.department))].sort(),
    [courses]
  );

  const visibleCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    return courses.filter((course) => {
      if (term) {
        const haystack = `${course.code} ${course.title} ${course.instructor}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }

      if (department && course.department !== department) return false;

      if (availability === 'open' && !hasFreeSeats(course)) return false;
      if (availability === 'full' && hasFreeSeats(course)) return false;

      return true;
    });
  }, [courses, search, department, availability]);

  const notify = (message, type = 'success') => setToast({ message, type });

  const updateCourse = (courseId, updater) =>
    setCourses((prev) => prev.map((course) => (course.id === courseId ? updater(course) : course)));

  const handleRegister = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    if (enrolledSet.has(courseId)) {
      notify(`You are already enrolled in ${course.code}.`, 'info');
      return;
    }

    if (!hasFreeSeats(course)) {
      notify(`${course.code} is already full.`, 'error');
      return;
    }

    if (totalCredits + course.credits > MAX_CREDITS_PER_STUDENT) {
      notify(CREDIT_LIMIT_MESSAGE, 'error');
      return;
    }

    updateCourse(courseId, (c) => ({ ...c, registered: c.registered + 1 }));
    setEnrolledIds((prev) => [...prev, courseId]);
    notify(`Registered for ${course.code} — ${course.title}`);
  };

  const handleDrop = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || !enrolledSet.has(courseId)) return;

    updateCourse(courseId, (c) => ({ ...c, registered: Math.max(0, c.registered - 1) }));
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
    notify(`Dropped ${course.code}. Seat released.`, 'info');
  };

  const handleSaveCourse = (course) => {
    setCourses((prev) => [...prev, course]);
    setShowAddCourse(false);
    notify(`${course.code} added to the catalog.`);
  };

  return (
    <div className="app-shell">
      <Header activeTab={activeTab} onTabChange={setActiveTab} enrolledCount={enrolled.length} />

      <main className="app-main">
        <StatsBar courses={courses} enrolled={enrolled} />

        {activeTab === 'catalog' ? (
          <CourseCatalog
            courses={visibleCourses}
            enrolledIds={enrolledSet}
            search={search}
            onSearch={setSearch}
            department={department}
            onDepartment={setDepartment}
            departments={departments}
            availability={availability}
            onAvailability={setAvailability}
            onRegister={handleRegister}
            onDrop={handleDrop}
            onAddCourse={() => setShowAddCourse(true)}
          />
        ) : (
          <MySchedule
            enrolled={enrolled}
            onDrop={handleDrop}
            onBrowse={() => setActiveTab('catalog')}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>React Course Registration System · data saved locally in your browser</p>
      </footer>

      {showAddCourse && (
        <AddCourseModal
          courses={courses}
          onClose={() => setShowAddCourse(false)}
          onSave={handleSaveCourse}
        />
      )}

      <Toast
        message={toast?.message}
        type={toast?.type}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
