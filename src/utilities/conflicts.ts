import { parseMeeting } from './meetings';

type Slot = ReturnType<typeof parseMeeting>[number];

interface HasTermAndMeets {
    term: string;
    meets: string;
}

const timesOverlap = (a: Slot, b: Slot): boolean => a.start < b.end && b.start < a.end;

const slotsConflict = (a: Slot, b: Slot): boolean => a.dayOffset === b.dayOffset && timesOverlap(a, b);

const meetingsConflict = (meetsA: string, meetsB: string): boolean => {
    const slotsB = parseMeeting(meetsB);
    return parseMeeting(meetsA).some(a => slotsB.some(b => slotsConflict(a, b)));
};

const coursesConflict = (a: HasTermAndMeets, b: HasTermAndMeets): boolean =>
    a.term === b.term && meetingsConflict(a.meets, b.meets);

export const hasConflict = (course: HasTermAndMeets, selectedCourses: HasTermAndMeets[]): boolean =>
    selectedCourses.some(selected => coursesConflict(course, selected));