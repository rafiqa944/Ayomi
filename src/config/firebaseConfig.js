// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore, collection, addDoc } from "firebase/firestore";  // Pastikan ini adalah import yang benar
import { getAnalytics } from "firebase/analytics"; // Import getAnalytics
import { getDatabase, ref, get, set } from 'firebase/database';


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
const firestore = getFirestore(app);
const storage = getStorage(app);

// Initialize and export auth
export const auth = getAuth(app);

// Export db (Firestore) and other functions you need
export { db, collection, addDoc, ref, get, set };