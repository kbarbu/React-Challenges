import type { CSSProperties, KeyboardEvent } from 'react';
import type { Course } from './types';

interface CourseCardProps {
    course: Course;
    color?: string;
    disabled?: boolean;
    onToggle: () => void;
    onEdit: () => void;
}

const CourseCard = ({ course, color, disabled = false, onToggle, onEdit }: CourseCardProps) => {
    const isSelected = color !== undefined;

    const handleClick = () => {
        if (!disabled) onToggle();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <li className={`course-card${isSelected ? ' selected' : ''}${disabled ? ' unselectable' : ''}`}
            style={isSelected ? { '--pick': color } as CSSProperties : undefined}
            data-term={course.term.toLowerCase()}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isSelected}
            aria-disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}>
            <button type="button"
                className="info-button"
                aria-label={`Edit CS ${course.number}`}
                onClick={e => {
                    e.stopPropagation();
                    onEdit();
                }}
                onKeyDown={e => e.stopPropagation()}>
                ⓘ
            </button>
            <h2>{course.term} CS {course.number}</h2>
            <p>{course.title}</p>
            <div className="meets">{course.meets}</div>
        </li>
    );
};

export default CourseCard;