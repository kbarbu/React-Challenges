import { useMemo } from 'react';
import { DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import { buildEvents, WEEK_DATES } from './calendarEvents';
import type { Courses } from './types';

interface TermCalendarProps {
    courses: Courses;
    selectedTerm: string;
    selectedCourses: string[];
}

const calendarConfig = {
    viewType: 'WorkWeek' as const,
    startDate: WEEK_DATES[0],
    headerDateFormat: 'ddd',
    headerHeight: 32,
    timeFormat: 'Clock12Hours' as const,
    heightSpec: 'BusinessHoursNoScroll' as const,
    businessBeginsHour: 9,
    businessEndsHour: 21,
    cellDuration: 60,
    cellHeight: 57,
    durationBarVisible: false,
    eventMoveHandling: 'Disabled' as const,
    eventResizeHandling: 'Disabled' as const,
    eventClickHandling: 'Disabled' as const,
    eventDeleteHandling: 'Disabled' as const,
    timeRangeSelectedHandling: 'Disabled' as const,
};

const TermCalendar = ({ courses, selectedTerm, selectedCourses }: TermCalendarProps) => {
    const events = useMemo(
        () => buildEvents(courses, selectedCourses),
        [courses, selectedCourses],
    );

    return (
        <section className="term-calendar" aria-label={`${selectedTerm} weekly calendar`}>
            <DayPilotCalendar {...calendarConfig} events={events} />
            {selectedCourses.length === 0 && (
                <div className="calendar-empty">
                    <p>No {selectedTerm} courses selected.</p>
                    <p>Click a course card to add it to your weekly calendar.</p>
                </div>
            )}
        </section>
    );
};

export default TermCalendar;