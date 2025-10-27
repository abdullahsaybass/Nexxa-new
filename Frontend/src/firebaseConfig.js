// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyB36ZPgDIRnN4Ad9NL6jf15wPIyH56Hw9s",
  authDomain: "nexssa-8420e.firebaseapp.com",
  projectId: "nexssa-8420e",
  storageBucket: "nexssa-8420e.appspot.com",
  messagingSenderId: "907663814139",
  appId: "1:907663814139:web:24a401905682e8db466f5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
