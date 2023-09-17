import React from 'react';
import { auth } from '../firebase'; // Adjust the relative path as needed
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import necessary Firebase modules

const GoogleLoginButton = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Create a GoogleAuthProvider instance
    try {
      await signInWithPopup(auth, provider); // Use 'auth' from '../firebase'
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
