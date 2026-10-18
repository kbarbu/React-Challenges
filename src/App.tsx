import './App.css';
import Banner from './utilities/Banner';
import TermPage from './utilities/TermPage';
import { useDocQuery } from './utilities/firestore';
import type { Schedule } from './utilities/types';

const SCHEDULE_ID = 'CS-2018-2019';

const ScheduleView = () => {
    const [schedule, isLoading, error] = useDocQuery<Schedule>('schedules', SCHEDULE_ID);

    if (error) return <h1>Error loading course data: {`${error}`}</h1>;
    if (isLoading) return <h1>Loading course data...</h1>;
    if (!schedule) return <h1>Schedule {SCHEDULE_ID} not found</h1>;

    return <TermPage scheduleId={SCHEDULE_ID} schedule={schedule} />;
};

const App = () => (
    <>
        <Banner />
        <ScheduleView />
    </>
);

export default App;