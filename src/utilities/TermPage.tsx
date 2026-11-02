import { useState } from 'react';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import TermCalendar from './TermCalendar';
import TermSelector from './TermSelector';
import { updateCourse } from './firestore';
import { useProfile } from './profile';
import type { CourseFormData } from './courseSchema';
import type { Schedule } from './types';

const NO_COURSES: string[] = [];

const toggleList = <T,>(x: T, lst: T[]): T[] => (
    lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

interface TermPageProps {
    scheduleId: string;
    schedule: Schedule;
}

const TermPage = ({ scheduleId, schedule }: TermPageProps) => {
    const [{ isAdmin }] = useProfile();
    const [selectedTerm, setSelectedTerm] = useState('Fall');
    const [selectedByTerm, setSelectedByTerm] = useState<Record<string, string[]>>({});

    const [editingCode, setEditingCode] = useState<string | null>(null);

    const selectedCourses = selectedByTerm[selectedTerm] ?? NO_COURSES;
    const editingCourse = editingCode === null ? undefined : schedule.courses[editingCode];

    const [query, setQuery] = useState('');

    const saveCourse = async (data: CourseFormData) => {
        if (editingCode === null) return;
        await updateCourse(scheduleId, editingCode, data);
    };

    const clearTerm = () => {
    setSelectedByTerm(byTerm => ({ ...byTerm, [selectedTerm]: NO_COURSES }));
    };

    const toggleSelected = (code: string) => {
        setSelectedByTerm(byTerm => ({
            ...byTerm,
            [selectedTerm]: toggleList(code, byTerm[selectedTerm] ?? NO_COURSES),
        }));
    };
    

    return (
        <main>
            <h1>{schedule.title}</h1>
            <div className="term-toolbar">
                <TermSelector selected={selectedTerm} setSelected={setSelectedTerm} />
                <button type="button"
                    className="cancel-button"
                    onClick={clearTerm}
                    disabled={selectedCourses.length === 0}>
                    Clear all
                </button>
                <input type="search"
                    className="course-search"
                    placeholder="Search courses"
                    aria-label="Search courses"
                    value={query}
                    onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="schedule-layout">
                <CourseList
                    courses={schedule.courses}
                    selectedTerm={selectedTerm}
                    selectedCourses={selectedCourses}
                    query={query}
                    toggleSelected={toggleSelected}
                    onEdit={isAdmin ? setEditingCode : undefined}
                />
                <TermCalendar
                    courses={schedule.courses}
                    selectedTerm={selectedTerm}
                    selectedCourses={selectedCourses}
                />
            </div>
            {isAdmin && editingCourse && (
                <CourseForm
                    course={editingCourse}
                    onClose={() => setEditingCode(null)}
                    onSave={saveCourse}
                />
            )}
        </main>
    );
};

export default TermPage;