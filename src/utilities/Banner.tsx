import { signInWithGoogle, signOut, useAuthState } from './firebase';

const Banner = () => {
    const { user } = useAuthState();

    return (
        <header className="banner">
            <span className="banner-greeting">
                Welcome {user ? user.displayName : ''}!
            </span>
            <span className="banner-actions">
                {user
                    ? <button type="button" className="auth-button" onClick={signOut}>Sign Out</button>
                    : <button type="button" className="auth-button" onClick={signInWithGoogle}>Sign In</button>}
            </span>
        </header>
    );
};

export default Banner;
