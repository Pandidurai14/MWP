import CourseCard from './CourseCard';

export default function CourseCatalog({
  courses,
  enrolledIds,
  search,
  onSearch,
  department,
  onDepartment,
  departments,
  availability,
  onAvailability,
  onRegister,
  onDrop,
  onAddCourse,
}) {
  return (
    <section>
      <div className="toolbar">
        <input
          className="input input--search"
          type="search"
          placeholder="Search by title, code or instructor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search courses"
        />

        <select
          className="input"
          value={department}
          onChange={(e) => onDepartment(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="">All departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={availability}
          onChange={(e) => onAvailability(e.target.value)}
          aria-label="Filter by availability"
        >
          <option value="">Any availability</option>
          <option value="open">Open seats only</option>
          <option value="full">Full only</option>
        </select>

        <button className="btn btn--accent" onClick={onAddCourse}>
          + Add course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses found</h3>
          <p>Try a different search term or clear the filters.</p>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              enrolled={enrolledIds.has(course.id)}
              onRegister={onRegister}
              onDrop={onDrop}
            />
          ))}
        </div>
      )}
    </section>
  );
}
