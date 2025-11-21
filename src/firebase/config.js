import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyCNBrwSVw7zDWV3voDHtZAyLddERyMYY_o",
  authDomain: "proffessor-28f6d.firebaseapp.com",
  projectId: "proffessor-28f6d",
  storageBucket: "proffessor-28f6d.firebasestorage.app",
  messagingSenderId: "868391592682",
  appId: "1:868391592682:web:3a29a5a8a934fb0529ad93",
  measurementId: "G-JBLMVXME9C"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;