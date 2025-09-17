// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB8xnNYbSrNNNcBN3__PbGvK-0TUmiECU0",
  authDomain: "tyro-298e2.firebaseapp.com",
  projectId: "tyro-298e2",
  storageBucket: "tyro-298e2.firebasestorage.app",
  messagingSenderId: "424191948146",
  appId: "1:424191948146:web:d8d44cca42eb914a9a19eb",
  measurementId: "G-WDDGMCE7CC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
