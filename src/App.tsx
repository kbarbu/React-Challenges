import './App.css';

import { schedules } from './schedules';
const schedule = schedules['CS-2018-2019'];


const App = () => (
    <main>
        <h1>{schedule.title}</h1>
        <ul className="course-list">
        {Object.entries(schedule.courses).map(([code, course]) => (
            <li
            key={code}
            className="course-card"
            data-term={course.term.toLowerCase()}
            >
            <h2>{course.term} CS {course.number}</h2>
            <p>{course.title}</p>
            <div className="meets">{course.meets}</div>
            </li>
        ))}
        </ul>
    </main>



);

export default App;