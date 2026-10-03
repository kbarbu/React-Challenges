import Modal from './Modal';
import { describeMeeting } from './meetings';
import type { Course } from './types';

interface CourseModalProps {
    course?: Course;
    onClose: () => void;
}

const TITLE_ID = 'course-modal-title';

const PENDING_FIELDS = [
    'Professor',
    'Room',
    'Course website',
    'Prerequisites',
    'Other requirements',
];

const CourseModal = ({ course, onClose }: CourseModalProps) => {
    if (!course) return null;

    return (
        <Modal labelledBy={TITLE_ID} onClose={onClose}>
            <div className="course-details" data-term={course.term.toLowerCase()}>
                <p className="course-details-term">{course.term}</p>
                <h2 id={TITLE_ID}>CS {course.number}: {course.title}</h2>
                <dl>
                    <div>
                        <dt>Meeting time</dt>
                        <dd>{describeMeeting(course.meets)}</dd>
                    </div>
                    {PENDING_FIELDS.map(field => (<div key={field}><dt>{field}</dt><dd className="pending" />
                        </div>
                    ))}
                </dl>
            </div>
        </Modal>
    );
};

export default CourseModal;