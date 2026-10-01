import type { CSSProperties, KeyboardEvent } from 'react';
import type { Course } from './types';

interface CourseCardProps {
    course: Course;
    color?: string;
    onToggle: () => void;
}

const CourseCard = ({ course, color, onToggle }: CourseCardProps) => {
    const isSelected = color !== undefined;

    const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <li className={`course-card${isSelected ? ' selected' : ''}`}
            style={isSelected ? { '--pick': color } as CSSProperties : undefined}
            data-term={course.term.toLowerCase()}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={onToggle}
            onKeyDown={handleKeyDown}>
            <h2>{course.term} CS {course.number}</h2>
            <p>{course.title}</p>
            <div className="meets">{course.meets}</div>
        </li>
    );
};

export default CourseCard;
