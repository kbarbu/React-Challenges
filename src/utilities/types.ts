export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

export type Courses = Record<string, Course>;

export interface Schedule {
    title: string;
    courses: Courses;
}

export interface ScheduleData {
    schedules: Record<string, Schedule>;
}
