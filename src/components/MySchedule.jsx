import { MAX_CREDITS_PER_STUDENT } from '../utils/registrationRules';

export default function MySchedule({ enrolled, onDrop, onBrowse }) {
  const credits = enrolled.reduce((sum, c) => sum + c.credits, 0);

  if (enrolled.length === 0) {
    return (
      <div className="empty-state empty-state--panel">
        <h3>You are not registered for any course yet</h3>
        <p>Browse the catalog and enroll to build your semester schedule.</p>
        <button className="btn btn--primary" onClick={onBrowse}>
          Browse courses
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="schedule-summary">
        <div>
          <h2>My semester schedule</h2>
          <p>
            {enrolled.length} course{enrolled.length > 1 ? 's' : ''} enrolled
          </p>
        </div>
        <div className="credit-chip">
          <span className="credit-chip__value">{credits}</span>
          <span className="credit-chip__label">of {MAX_CREDITS_PER_STUDENT} credits</span>
        </div>
      </div>

      <div className="table-wrap">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course</th>
              <th>Instructor</th>
              <th>Schedule</th>
              <th>Credits</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {enrolled.map((course) => (
              <tr key={course.id}>
                <td>
                  <span className="course-code">{course.code}</span>
                </td>
                <td>
                  <strong>{course.title}</strong>
                  <span className="table-sub">{course.room}</span>
                </td>
                <td>{course.instructor}</td>
                <td>{course.schedule}</td>
                <td>{course.credits}</td>
                <td className="table-actions">
                  <button className="btn btn--danger btn--sm" onClick={() => onDrop(course.id)}>
                    Drop
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
