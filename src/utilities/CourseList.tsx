import { colorForIndex } from './colors';
import CourseCard from './CourseCard';
import { hasConflict } from './conflicts';
import type { Courses } from './types';

interface CourseListProps {
    courses: Courses;
    selectedTerm: string;
    selectedCourses: string[];
    toggleSelected: (code: string) => void;
    onEdit: (code: string) => void;
}

const CourseList = ({ courses, selectedTerm, selectedCourses, toggleSelected, onEdit }: CourseListProps) => {
    const selectedCourseData = selectedCourses.map(code => courses[code]).filter(Boolean);

    return (
        <ul className="course-list">
            {Object.entries(courses)
                .filter(([, course]) => course.term === selectedTerm)
                .map(([code, course]) => {
                    const index = selectedCourses.indexOf(code);
                    const isSelected = index !== -1;
                    return (
                        <CourseCard
                            key={code}
                            course={course}
                            color={isSelected ? colorForIndex(index) : undefined}
                            disabled={!isSelected && hasConflict(course, selectedCourseData)}
                            onToggle={() => toggleSelected(code)}
                            onEdit={() => onEdit(code)}
                        />
                    );
                })}
        </ul>
    );
};

export default CourseList;