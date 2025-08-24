// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqCO8rL7aYC9PVVJH1e9a6sRMLmxlhJCQ",
  authDomain: "funrevis.firebaseapp.com", 
  projectId: "funrevis",
  storageBucket: "funrevis.appspot.com",
  messagingSenderId: "471816848749",
  appId: "1:471816848749:web:9efb5c8bb97a7e9a2d5c3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
