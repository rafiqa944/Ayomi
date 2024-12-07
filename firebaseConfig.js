// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDUPTuWik0-byDbneGbuWKcS_SYQxJfLT4",
//   authDomain: "ayomi-d849c.firebaseapp.com",
//   projectId: "ayomi-d849c",
//   storageBucket: "ayomi-d849c.firebasestorage.app",
//   messagingSenderId: "240267578188",
//   appId: "1:240267578188:web:efb67712800d040cc9dde9"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider();
// const db = getFirestore(app);








// export { auth, db, googleProvider };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUPTuWik0-byDbneGbuWKcS_SYQxJfLT4",
  authDomain: "ayomi-d849c.firebaseapp.com",
  projectId: "ayomi-d849c",
  storageBucket: "ayomi-d849c.firebasestorage.app",
  messagingSenderId: "240267578188",
  appId: "1:240267578188:web:efb67712800d040cc9dde9"
};

// Pastikan hanya satu instance aplikasi Firebase yang diinisialisasi
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Ekspor layanan Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);


