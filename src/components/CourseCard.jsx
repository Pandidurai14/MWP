import { seatLabel, seatsLeft } from '../utils/registrationRules';

export default function CourseCard({ course, enrolled, onRegister, onDrop }) {
  const full = seatsLeft(course) === 0;
  const canAct = enrolled || !full;

  return (
    <article className={`course-card ${enrolled ? 'course-card--enrolled' : ''}`}>
      <div className="course-card__top">
        <span className="course-code">{course.code}</span>
        <span className={`seat-pill ${full ? 'seat-pill--full' : ''}`}>
          {seatLabel(course)}
        </span>
      </div>

      <h3 className="course-title">{course.title}</h3>
      <p className="course-meta">{course.department}</p>

      <dl className="course-details">
        <div>
          <dt>Instructor</dt>
          <dd>{course.instructor}</dd>
        </div>
        <div>
          <dt>Schedule</dt>
          <dd>{course.schedule}</dd>
        </div>
        <div>
          <dt>Venue</dt>
          <dd>{course.room}</dd>
        </div>
        <div>
          <dt>Credits</dt>
          <dd>{course.credits}</dd>
        </div>
      </dl>

      <div className="course-card__footer">
        <div
          className="seat-bar"
          role="img"
          aria-label={`${course.registered} of ${course.seats} seats filled`}
        >
          <span
            className="seat-bar__fill"
            style={{ width: `${Math.min(100, (course.registered / course.seats) * 100)}%` }}
          />
        </div>

        {enrolled ? (
          <button className="btn btn--danger" onClick={() => onDrop(course.id)}>
            Drop course
          </button>
        ) : (
          <button
            className="btn btn--primary"
            disabled={!canAct}
            onClick={() => onRegister(course.id)}
          >
            {full ? 'Seats full' : 'Register'}
          </button>
        )}
      </div>
    </article>
  );
}
