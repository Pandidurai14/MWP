import { MAX_CREDITS_PER_STUDENT } from '../utils/registrationRules';

export default function StatsBar({ courses, enrolled }) {
  const totalSeats = courses.reduce((sum, c) => sum + c.seats, 0);
  const takenSeats = courses.reduce((sum, c) => sum + c.registered, 0);
  const credits = enrolled.reduce((sum, c) => sum + c.credits, 0);
  const openCourses = courses.filter((c) => c.registered < c.seats).length;

  const stats = [
    { label: 'Courses offered', value: courses.length },
    { label: 'Seats filled', value: `${takenSeats}/${totalSeats}` },
    { label: 'Open courses', value: openCourses },
    { label: 'My credits', value: `${credits}/${MAX_CREDITS_PER_STUDENT}` },
  ];

  return (
    <section className="stats" aria-label="Registration statistics">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
