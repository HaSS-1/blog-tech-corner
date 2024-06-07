// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "tech-corner-cedb4.firebaseapp.com",
  projectId: "tech-corner-cedb4",
  storageBucket: "tech-corner-cedb4.appspot.com",
  messagingSenderId: "862941862385",
  appId: "1:862941862385:web:dd95cb946c4fb6d0af8c50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);