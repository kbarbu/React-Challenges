import { colorForIndex } from './colors';
import CourseCard from './CourseCard';
import type { Courses } from './types';

interface CourseListProps {
    courses: Courses;
    selectedTerm: string;
    selectedCourses: string[];
    toggleSelected: (code: string) => void;
}

const CourseList = ({ courses, selectedTerm, selectedCourses, toggleSelected }: CourseListProps) => (
    <ul className="course-list">
        {Object.entries(courses)
            .filter(([, course]) => course.term === selectedTerm)
            .map(([code, course]) => {
                const index = selectedCourses.indexOf(code);
                return (
                    <CourseCard
                        key={code}
                        course={course}
                        color={index === -1 ? undefined : colorForIndex(index)}
                        onToggle={() => toggleSelected(code)}
                    />
                );
            })}
    </ul>
);

export default CourseList;