import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAelQ6UXX8PE_4VIoUoqWXnQJhlAfjPD4g",
  authDomain: "ec463-mini-project-1.firebaseapp.com",
  projectId: "ec463-mini-project-1",
  storageBucket: "ec463-mini-project-1.appspot.com",
  messagingSenderId: "101667449986",
  appId: "1:101667449986:web:8a4eaadeb032ef09e6d89b",
  measurementId: "G-N148NBVHM4"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Firebase Authentication service
const provider = new GoogleAuthProvider();

/*
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
};
*/ 
export { auth, provider }; // Export the 'auth' service
