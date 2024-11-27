// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9atsGbytaJ6B-TFGCyRF-Tnv-Ws-ZeRg",
  authDomain: "easybuy-a0e00.firebaseapp.com",
  projectId: "easybuy-a0e00",
  storageBucket: "easybuy-a0e00.firebasestorage.app",
  messagingSenderId: "268367675135",
  appId: "1:268367675135:web:89d43b402f5030464ad6ca",
  measurementId: "G-WWWG2B5R9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; // Export the initialized Firebase app
