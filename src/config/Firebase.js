// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI16KFxNLjeS1K3wRYxUNCeF_mu7cvrBE",
  authDomain: "fir-course-326a7.firebaseapp.com",
  projectId: "fir-course-326a7",
  storageBucket: "fir-course-326a7.appspot.com",
  messagingSenderId: "1073598802491",
  appId: "1:1073598802491:web:09babec0697ed14db8ca1e",
  measurementId: "G-87ZYSPZJB7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
