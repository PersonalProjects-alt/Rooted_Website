// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVTEbzOtiOOanUYHiscpNh4YFqjJLeTbI",
  authDomain: "auth-rooted.firebaseapp.com",
  projectId: "auth-rooted",
  storageBucket: "auth-rooted.firebasestorage.app",
  messagingSenderId: "318098197776",
  appId: "1:318098197776:web:c52eae0c567c310d2be995",

  databaseURL: "https://auth-rooted-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)