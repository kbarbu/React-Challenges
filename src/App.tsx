import './App.css';
import TermPage from './utilities/TermPage';
import { useJsonQuery } from './utilities/fetch';

const DATA_URL = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php';
const SCHEDULE_ID = 'CS-2018-2019';

interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface Schedule {
    title: string;
    courses: Record<string, Course>;
}

interface ScheduleData {
    schedules: Record<string, Schedule>;
}

const App = () => {
    const [json, isLoading, error] = useJsonQuery(DATA_URL);

    if (error) return <h1>Error loading course data: {`${error}`}</h1>;
    if (isLoading) return <h1>Loading course data...</h1>;
    if (!json) return <h1>No course data found</h1>;

    const schedule = (json as ScheduleData).schedules[SCHEDULE_ID];

    if (!schedule) return <h1>Schedule {SCHEDULE_ID} not found</h1>;

    return <TermPage schedule={schedule} />;
};

export default App;