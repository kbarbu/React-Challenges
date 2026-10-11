import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const pattern = /^((?:M|Tu|W|Th|F)+)\s+(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/;

const toMinutes = (hour: string, minute: string) => Number(hour) * 60 + Number(minute);

export const isValidMeeting = (meets: string): boolean => {
    if (meets === '') return true;
    const match = pattern.exec(meets);
    if (!match) return false;
    const [, days, startHour, startMinute, endHour, endMinute] = match;
    const dayList = days.match(/Tu|Th|M|W|F/g) ?? [];
    const hasRepeatedDay = new Set(dayList).size !== dayList.length;
    const outOfRange = [startHour, endHour].some(h => Number(h) > 23)
        || [startMinute, endMinute].some(m => Number(m) > 59);
    if (hasRepeatedDay || outOfRange) return false;
    return toMinutes(startHour, startMinute) < toMinutes(endHour, endMinute);
};

export const CourseFields = z.object({
    title: z.string().trim().min(2, 'must be at least two characters'),
    meets: z.string().trim().refine(isValidMeeting, 'must contain days and start-end, e.g., MWF 12:00-13:20'),
});

export type CourseFormData = z.infer<typeof CourseFields>;

export const courseResolver = zodResolver(CourseFields);
