// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace this with your own config from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyDHo7PhxNRjFyRoZ_d9wdiXWp-AFgfEpGs",
  authDomain: "hcde-438-trivia-app.firebaseapp.com",
  projectId: "hcde-438-trivia-app",
  storageBucket: "hcde-438-trivia-app.firebasestorage.app",
  messagingSenderId: "156554387398",
  appId: "1:156554387398:web:f1d145b801fbdf20399cc7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };