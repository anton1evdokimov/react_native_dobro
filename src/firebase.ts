// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCIq1fwD3fMOcMz8AEO4f4jKUmvqrEhHjw',
  authDomain: 'welcomehelp-f729b.firebaseapp.com',
  projectId: 'welcomehelp-f729b',
  storageBucket: 'welcomehelp-f729b.appspot.com',
  messagingSenderId: '1070712262125',
  appId: '1:1070712262125:web:299c0826efd04f82d7ebe4',
  measurementId: 'G-22L0W2FH3D',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
