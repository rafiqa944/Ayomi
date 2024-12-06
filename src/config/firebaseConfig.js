// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import getFirestore
import { getAnalytics } from "firebase/analytics"; // Import getAnalytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWe5beh2FFhgtH09_eXOk7KK3qCaIwJw8",
  authDomain: "ayomi-d1337.firebaseapp.com",
  projectId: "ayomi-d1337",
  storageBucket: "ayomi-d1337.firebasestorage.app",
  messagingSenderId: "943031316343",
  appId: "1:943031316343:web:ffdc4c88f68e1749e03b72",
  measurementId: "G-D20L6CHF2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

// Initialize and export auth
export const auth = getAuth(app);
export { db }; // Export db (Firestore)
