import { useAuthState } from './firebase';
import { useDataQuery } from './firestore';

export const useProfile = () => {
    const { user } = useAuthState();
    const [adminRecord, isLoading, error] = useDataQuery(`admins/${user?.uid || 'guest'}`);
    const isAdmin = adminRecord !== undefined;
    return [{ user, isAdmin }, isLoading, error] as const;
};