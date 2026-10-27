import { useState } from 'react';
import { validateCourse } from '../utils/registrationRules';

const EMPTY_FORM = {
  code: '',
  title: '',
  department: 'Computer Science',
  instructor: '',
  credits: 3,
  seats: 40,
  schedule: 'Mon / Wed · 09:00 - 10:30',
  room: 'Block A · 101',
};

export default function AddCourseModal({ courses, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const problem = validateCourse(form, courses);
    if (problem) {
      setError(problem);
      return;
    }

    const code = form.code.trim().toUpperCase();
    onSave({
      ...form,
      id: `${code}-${Date.now()}`,
      code,
      title: form.title.trim(),
      instructor: form.instructor.trim(),
      credits: Number(form.credits),
      seats: Number(form.seats),
      registered: 0,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-course-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="add-course-title">Add new course</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <form className="modal__body" onSubmit={submit}>
          <div className="field-row">
            <label className="field">
              <span>Course code</span>
              <input
                className="input"
                value={form.code}
                onChange={update('code')}
                placeholder="CS350"
                autoFocus
              />
            </label>
            <label className="field">
              <span>Credits</span>
              <input
                className="input"
                type="number"
                min="1"
                max="6"
                value={form.credits}
                onChange={update('credits')}
              />
            </label>
          </div>

          <label className="field">
            <span>Course title</span>
            <input
              className="input"
              value={form.title}
              onChange={update('title')}
              placeholder="Operating Systems"
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Department</span>
              <input className="input" value={form.department} onChange={update('department')} />
            </label>
            <label className="field">
              <span>Instructor</span>
              <input
                className="input"
                value={form.instructor}
                onChange={update('instructor')}
                placeholder="Dr. S. Name"
              />
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span>Seats</span>
              <input
                className="input"
                type="number"
                min="1"
                max="500"
                value={form.seats}
                onChange={update('seats')}
              />
            </label>
            <label className="field">
              <span>Venue</span>
              <input className="input" value={form.room} onChange={update('room')} />
            </label>
          </div>

          <label className="field">
            <span>Schedule</span>
            <input
              className="input"
              value={form.schedule}
              onChange={update('schedule')}
              placeholder="Mon / Wed · 09:00 - 10:30"
            />
          </label>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Save course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
