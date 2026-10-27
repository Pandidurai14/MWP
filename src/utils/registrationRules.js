export const MAX_CREDITS_PER_STUDENT = 18;

export const CREDIT_LIMIT_MESSAGE = `Credit limit reached (${MAX_CREDITS_PER_STUDENT} credits per semester)`;

/** A course counts as available when it has at least one free seat. */
export const hasFreeSeats = (course) => course.registered < course.seats;

export const seatsLeft = (course) => Math.max(0, course.seats - course.registered);

/**
 * Validates adding a brand new course.
 * Returns an error string, or null when the payload is valid.
 */
export function validateCourse(course, existingCourses) {
  if (!course.code.trim()) return 'Course code is required.';
  if (!course.title.trim()) return 'Course title is required.';
  if (!course.instructor.trim()) return 'Instructor name is required.';

  if (existingCourses.some((c) => c.code.toLowerCase() === course.code.trim().toLowerCase())) {
    return `Course code "${course.code.trim()}" already exists.`;
  }

  const credits = Number(course.credits);
  if (!Number.isInteger(credits) || credits < 1 || credits > 6) {
    return 'Credits must be a whole number between 1 and 6.';
  }

  const seats = Number(course.seats);
  if (!Number.isInteger(seats) || seats < 1 || seats > 500) {
    return 'Seats must be a whole number between 1 and 500.';
  }

  return null;
}

/** Human friendly list of the free seats remaining, e.g. "3 seats left". */
export function seatLabel(course) {
  const left = seatsLeft(course);
  if (left === 0) return 'Full';
  if (left === 1) return '1 seat left';
  return `${left} seats left`;
}
