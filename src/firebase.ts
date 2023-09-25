// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-G57A611Uxct6s4eEAQA1gwg6vEtKfpM",
  authDomain: "dobrohelp-cc47c.firebaseapp.com",
  databaseURL: "https://dobrohelp-cc47c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dobrohelp-cc47c",
  storageBucket: "dobrohelp-cc47c.appspot.com",
  messagingSenderId: "784624103572",
  appId: "1:784624103572:web:b2ee22c0911d84a1858481",
  measurementId: "G-WSVK9FK2EB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
