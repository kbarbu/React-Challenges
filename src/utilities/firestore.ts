import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

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