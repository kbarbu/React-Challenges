import { useState } from 'react';
import CourseList from './CourseList';
import TermCalendar from './TermCalendar';
import TermSelector from './TermSelector';
import type { Schedule } from './types';

const NO_COURSES: string[] = [];

const toggleList = <T,>(x: T, lst: T[]): T[] => (
    lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

interface TermPageProps {
    schedule: Schedule;
}

const TermPage = ({ schedule }: TermPageProps) => {
    const [selectedTerm, setSelectedTerm] = useState('Fall');
    const [selectedByTerm, setSelectedByTerm] = useState<Record<string, string[]>>({});

    const selectedCourses = selectedByTerm[selectedTerm] ?? NO_COURSES;

    const toggleSelected = (code: string) => {
        setSelectedByTerm(byTerm => ({
            ...byTerm,
            [selectedTerm]: toggleList(code, byTerm[selectedTerm] ?? NO_COURSES),
        }));
    };

    return (
        <main>
            <h1>{schedule.title}</h1>
            <TermSelector selected={selectedTerm} setSelected={setSelectedTerm} />
            <div className="schedule-layout">
                <CourseList
                    courses={schedule.courses}
                    selectedTerm={selectedTerm}
                    selectedCourses={selectedCourses}
                    toggleSelected={toggleSelected}
                />
                <TermCalendar
                    courses={schedule.courses}
                    selectedTerm={selectedTerm}
                    selectedCourses={selectedCourses}
                />
            </div>
        </main>
    );
};

export default TermPage;