import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import { courseResolver } from './courseSchema';
import type { CourseFormData } from './courseSchema';
import type { Course } from './types';

interface CourseFormProps {
    course: Course;
    onClose: () => void;
    onSave: (data: CourseFormData) => Promise<void>;
}

const TITLE_ID = 'course-form-title';

const CourseForm = ({ course, onClose, onSave }: CourseFormProps) => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<CourseFormData>({
        defaultValues: { title: course.title, meets: course.meets },
        mode: 'onChange',
        resolver: courseResolver,
    });

    const onSubmit: SubmitHandler<CourseFormData> = async data => {
        try {
            await onSave(data);
            onClose();
        } catch (err) {
            setError('root', { message: `Could not save: ${(err as Error).message}` });
        }
    };

    return (
        <Modal labelledBy={TITLE_ID} onClose={onClose}>
            <form className="course-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 id={TITLE_ID}>Edit CS {course.number}</h2>
                <label htmlFor="course-title">
                    Course name
                    {errors.title && <span className="field-error" role="alert">{errors.title.message}</span>}
                </label>
                <input id="course-title"
                    type="text"
                    aria-invalid={errors.title ? true : undefined}
                    {...register('title')} />
                <label htmlFor="course-meets">
                    Meeting times
                    {errors.meets && <span className="field-error" role="alert">{errors.meets.message}</span>}
                </label>
                <input id="course-meets"
                    type="text"
                    placeholder="MWF 12:00-13:00"
                    aria-invalid={errors.meets ? true : undefined}
                    {...register('meets')} />
                {errors.root && <span className="field-error" role="alert">{errors.root.message}</span>}
                <div className="course-form-actions">
                    <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    <button type="submit" className="save-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CourseForm;