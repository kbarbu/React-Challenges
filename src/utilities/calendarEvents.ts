import { colorForIndex } from './colors';
import { formatTimeRange, parseMeeting } from './meetings';
import type { Courses } from './types';

export const WEEK_DATES = ['2026-01-05', '2026-01-06', '2026-01-07', '2026-01-08', '2026-01-09'];

const escapeHtml = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const toEventHtml = (title: string, time: string) =>
    `<div class="event-title">${escapeHtml(title)}</div><div class="event-time">${time}</div>`;

export const buildEvents = (courses: Courses, selectedCodes: string[]) =>
    selectedCodes.flatMap((code, index) => {
        const course = courses[code];
        if (!course) return [];
        const title = `CS ${course.number}: ${course.title}`;
        return parseMeeting(course.meets).map(slot => ({
            id: `${code}-${slot.dayOffset}`,
            text: title,
            html: toEventHtml(title, formatTimeRange(slot.start, slot.end)),
            start: `${WEEK_DATES[slot.dayOffset]}T${slot.start}:00`,
            end: `${WEEK_DATES[slot.dayOffset]}T${slot.end}:00`,
            backColor: colorForIndex(index),
            tags: { code },
        }));
    });