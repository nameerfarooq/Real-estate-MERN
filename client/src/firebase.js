// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "real-estate-mern-77d4c.firebaseapp.com",
  projectId: "real-estate-mern-77d4c",
  storageBucket: "real-estate-mern-77d4c.appspot.com",
  messagingSenderId: "547866194213",
  appId: "1:547866194213:web:ef486f358537219a7b2acc",

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
