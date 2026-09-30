interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseListProps {
    courses: Record<string, Course>;
    selectedTerm: string;
}

const CourseList = ({ courses, selectedTerm }: CourseListProps) => (
    <ul className="course-list">
        {Object.entries(courses).filter(([, course]) => course.term === selectedTerm).map(([code, course]) => (
                <li key={code} className="course-card" data-term={course.term.toLowerCase()}>
                    <h2>{course.term} CS {course.number}</h2>
                    <p>{course.title}</p>
                    <div className="meets">{course.meets}</div>
                </li>
            ))}
    </ul>
);

export default CourseList;
