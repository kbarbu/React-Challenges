import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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
