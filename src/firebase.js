// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFZN94-yJ1yimIg6iSOVKogAc9MjB3i7A",
  authDomain: "ctrlhabits-ef007.firebaseapp.com",
  projectId: "ctrlhabits-ef007",
  storageBucket: "ctrlhabits-ef007.appspot.com",
  messagingSenderId: "311488679420",
  appId: "1:311488679420:web:1716ac7866c99f12f83679",
  measurementId: "G-WVQHEM8RF8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default app;