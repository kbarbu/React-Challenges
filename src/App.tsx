import './App.css';

import { schedules } from './schedules';
const schedule = schedules['CS-2018-2019'];


const App = () => (
    <main>
        <h1>{schedule.title}</h1>
        <ul>
        {Object.entries(schedule.courses).map(([code, course]) => (
            <li key={code}> {course.term} CS {course.number}: {course.title}</li>))}
        </ul>
    </main>

);

export default App;