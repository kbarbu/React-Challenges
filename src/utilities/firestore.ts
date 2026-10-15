import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { CourseFormData } from './courseSchema';

type DataQueryResult<T> = [T | undefined, boolean, Error | null];

export function useDataQuery<T>(path: string): DataQueryResult<T> {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setData(undefined);
        setError(null);

    return onSnapshot(
        doc(db, path),
        snapshot => {
            setData(snapshot.exists() ? (snapshot.data() as T) : undefined);
            setLoading(false);
            },
            err => {
                setError(err);
                setLoading(false);
            },
        );
    }, [path]);

    return [data, loading, error];
};

export const useDocQuery = <T,>(collectionName: string, id: string) => useDataQuery<T>(`${collectionName}/${id}`);

export const updateCourse = (scheduleId: string, code: string, values: CourseFormData) =>
    updateDoc(doc(db, 'schedules', scheduleId), {
        [`courses.${code}.title`]: values.title,
        [`courses.${code}.meets`]: values.meets,
    });