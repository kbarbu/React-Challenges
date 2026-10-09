import { useState } from 'react';
import type { FormEvent } from 'react';
import Modal from './Modal';
import type { Course } from './types';

interface CourseFormProps {
    course: Course;
    onClose: () => void;
}

const TITLE_ID = 'course-form-title';

const CourseForm = ({ course, onClose }: CourseFormProps) => {
    const [title, setTitle] = useState(course.title);
    const [meets, setMeets] = useState(course.meets);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Modal labelledBy={TITLE_ID} onClose={onClose}>
            <form className="course-form" onSubmit={onSubmit}>
                <h2 id={TITLE_ID}>Edit CS {course.number}</h2>
                <label htmlFor="course-title">Course name</label>
                <input id="course-title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <label htmlFor="course-meets">Meeting times</label>
                <input id="course-meets" type="text" value={meets} placeholder="MWF 12:00-13:00" onChange={e => setMeets(e.target.value)} />
                <div className="course-form-actions">
                    <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default CourseForm;
