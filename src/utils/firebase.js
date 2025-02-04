// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS8H2xLXa6eI3rnIDmPOYvGkqMga4R0KE",
  authDomain: "netflixgpt-a27ae.firebaseapp.com",
  projectId: "netflixgpt-a27ae",
  storageBucket: "netflixgpt-a27ae.firebasestorage.app",
  messagingSenderId: "739896979923",
  appId: "1:739896979923:web:62f7f8af60e314323a7f26",
  measurementId: "G-38YQN3XJVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth()