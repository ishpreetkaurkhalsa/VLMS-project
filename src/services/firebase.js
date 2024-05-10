// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore' 
const {
    VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID,
} = import.meta.env
const firebaseConfig = {
    apiKey: "AIzaSyDDP81FDYRYu8FV6XTV1Xyo-yPPPeAVlUc",
    authDomain: "netflix-proj-9d0b9.firebaseapp.com",
    projectId: "netflix-proj-9d0b9",
    storageBucket: "netflix-proj-9d0b9.appspot.com",
    messagingSenderId: "1077417428782",
    appId: "1:1077417428782:web:6b30d785c2dffe1fd8dcbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);