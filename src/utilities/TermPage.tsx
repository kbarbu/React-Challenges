import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';

interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface Schedule {
    title: string;
    courses: Record<string, Course>;
}

interface TermPageProps {
    schedule: Schedule;
}

const TermPage = ({ schedule }: TermPageProps) => {
    const [selectedTerm, setSelectedTerm] = useState('Fall');

    return (
        <main>
            <h1>{schedule.title}</h1>
            <TermSelector selected={selectedTerm} setSelected={setSelectedTerm} />
            <CourseList courses={schedule.courses} selectedTerm={selectedTerm} />
        </main>
    );
};

export default TermPage;
