export interface MeetingSlot {
    dayOffset: number;
    start: string;
    end: string;
}

const DAY_OFFSETS: Record<string, number> = { M: 0, Tu: 1, W: 2, Th: 3, F: 4 };
const MEETING_PATTERN = /^([A-Za-z]+)\s+(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/;

const toClock = (hour: string, minute: string) => `${hour.padStart(2, '0')}:${minute}`;

const to12Hour = (clock: string) => {
    const [hour, minute] = clock.split(':').map(Number);
    return {
        label: `${hour % 12 || 12}:${String(minute).padStart(2, '0')}`,
        suffix: hour >= 12 ? 'PM' : 'AM',
    };
};

export const parseMeeting = (meets: string): MeetingSlot[] => {
    const match = meets.trim().match(MEETING_PATTERN);
    if (!match) return [];
    const [, days, startHour, startMinute, endHour, endMinute] = match;
    const start = toClock(startHour, startMinute);
    const end = toClock(endHour, endMinute);
    return (days.match(/Tu|Th|M|W|F/g) ?? []).map(day => ({
        dayOffset: DAY_OFFSETS[day],
        start,
        end,
    }));
};

export const formatTimeRange = (start: string, end: string) => {
    const from = to12Hour(start);
    const to = to12Hour(end);
    return from.suffix === to.suffix
        ? `${from.label}–${to.label} ${to.suffix}`
        : `${from.label} ${from.suffix}–${to.label} ${to.suffix}`;
};