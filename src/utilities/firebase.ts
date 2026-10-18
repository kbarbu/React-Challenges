import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type NextOrObserver, type User } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDntkt5A6JCr1taAVBPihzoHTKJDbyiMpw",
  authDomain: "react-challenges-kb.firebaseapp.com",
  projectId: "react-challenges-kb",
  storageBucket: "react-challenges-kb.firebasestorage.app",
  messagingSenderId: "467545301424",
  appId: "1:467545301424:web:c4aff38a35bc1aefe5b675",
  measurementId: "G-D3T6Y723FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(auth);

export { firebaseSignOut as signOut };

export interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  isInitialLoading: boolean
}

export const addAuthStateListener = (fn: NextOrObserver<User>) => (
  onAuthStateChanged(auth, fn)
);

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => addAuthStateListener((user) => {
    flushSync(() => {
      setUser(user);
      setIsInitialLoading(false);
    });
  }), []);

  return { user, isAuthenticated, isInitialLoading };
};