import { parseMeeting } from './meetings';

interface Slot {
    dayOffset: number;
    start: number;
    end: number;
}

interface HasTermAndMeets {
    term: string;
    meets: string;
}

const timesOverlap = (a: Slot, b: Slot): boolean => a.start < b.end && b.start < a.end;

const slotsConflict = (a: Slot, b: Slot): boolean => a.dayOffset === b.dayOffset && timesOverlap(a, b);

const meetingsConflict = (meetsA: string, meetsB: string): boolean => {
    const slotsB: Slot[] = parseMeeting(meetsB);
    return parseMeeting(meetsA).some((a: Slot) => slotsB.some((b: Slot) => slotsConflict(a, b)));
};

const coursesConflict = (a: HasTermAndMeets, b: HasTermAndMeets): boolean =>
    a.term === b.term && meetingsConflict(a.meets, b.meets);

export const hasConflict = (course: HasTermAndMeets, selectedCourses: HasTermAndMeets[]): boolean =>
    selectedCourses.some(selected => coursesConflict(course, selected));