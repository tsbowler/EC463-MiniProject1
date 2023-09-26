import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
//import '../style.scss';




function GoogleLoginButton() {
  const [user] = useAuthState(auth);
  const [redirectTo, setRedirectTo] = useState(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.error('Google Sign-In Error:', error);
    }
  };

  useEffect(() => {
    // Redirect the user to the home or search page after signing in
    if (user) {
      setRedirectTo('/home'); // Replace with the URL of your home page
      // or setRedirectTo('/search') if you want to redirect to the search page
    }
  }, [user]);

  useEffect(() => {
    // Perform the redirection when `redirectTo` is set
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  }, [redirectTo]);

  return (
    // <div>
    //   <button onClick={handleGoogleSignIn}>
    //     Sign in with Google
    //   </button>
    // </div>
    
    
    <div className="formContainer">
    <div className="formWrapper">
        <span className="logo">FindMyFriends</span>
          <div></div>
            <button onClick={handleGoogleSignIn}>Sign in with Google </button>
        
    </div>
</div>



  );
}

export default GoogleLoginButton;