import { useState } from 'react';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import TermCalendar from './TermCalendar';
import TermSelector from './TermSelector';
import { updateCourse } from './firestore';
import { useAuthState } from './firebase';
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
    const { isAuthenticated } = useAuthState();
    const [selectedTerm, setSelectedTerm] = useState('Fall');
    const [selectedByTerm, setSelectedByTerm] = useState<Record<string, string[]>>({});

    const [editingCode, setEditingCode] = useState<string | null>(null);

    const selectedCourses = selectedByTerm[selectedTerm] ?? NO_COURSES;
    const editingCourse = editingCode === null ? undefined : schedule.courses[editingCode];

    const saveCourse = async (data: CourseFormData) => {
        if (editingCode === null) return;
        await updateCourse(scheduleId, editingCode, data);
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
            <TermSelector selected={selectedTerm} setSelected={setSelectedTerm} />
            <div className="schedule-layout">
                <CourseList
                    courses={schedule.courses}
                    selectedTerm={selectedTerm}
                    selectedCourses={selectedCourses}
                    toggleSelected={toggleSelected}
                    onEdit={isAuthenticated ? setEditingCode : undefined}
                />
                <TermCalendar
                    courses={schedule.courses}
                    selectedTerm={selectedTerm}
                    selectedCourses={selectedCourses}
                />
            </div>
            {isAuthenticated && editingCourse && (
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