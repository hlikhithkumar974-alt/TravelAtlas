// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHUhGAJVt6VHeJA-Yj4dzH52eF3StC3yk",
  authDomain: "webywebsite-addc8.firebaseapp.com",
  projectId: "webywebsite-addc8",
  storageBucket: "webywebsite-addc8.firebasestorage.app",
  messagingSenderId: "1029997314379",
  appId: "1:1029997314379:web:7fcd4095fb798a3f08a8ce",
  measurementId: "G-4SN4EZ4L34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
