import { parseMeeting } from './meetings';

const timesOverlap = (a, b) => a.start < b.end && b.start < a.end;

const slotsConflict = (a, b) => a.dayOffset === b.dayOffset && timesOverlap(a, b);

const meetingsConflict = (meetsA, meetsB) => {
    const slotsB = parseMeeting(meetsB);
    return parseMeeting(meetsA).some(a => slotsB.some(b => slotsConflict(a, b)));
};

const coursesConflict = (a, b) =>
    a.term === b.term && meetingsConflict(a.meets, b.meets);

export const hasConflict = (course, selectedCourses) =>
    selectedCourses.some(selected => coursesConflict(course, selected));
