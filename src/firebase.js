//import firebase from 'firebase/app';
// import 'firebase/auth';

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyAelQ6UXX8PE_4VIoUoqWXnQJhlAfjPD4g',
  authDomain: 'ec463-mini-project-1.firebaseapp.com',
  projectId: 'ec463-mini-project-1',
  storageBucket: 'ec463-mini-project-1.appspot.com',
  messagingSenderId: '101667449986',
  appId: '1:101667449986:web:8a4eaadeb032ef09e6d89b',
  measurementId: "G-N148NBVHM4"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// export default firebase;
const auth = getAuth(app);

export { auth }; // Export the 'auth' object or any other Firebase services you need

*/

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Firebase Authentication service

export { auth }; // Export the 'auth' service
