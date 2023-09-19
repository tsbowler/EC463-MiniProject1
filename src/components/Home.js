import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Make sure you import your Firebase auth instance
import Search from './Search';

const Home = () => {
  const [user] = useAuthState(auth); // Get the authenticated user
  console.log(user)
  return (
    <div>
      <h2>Welcome to the Chat Room</h2>
      {user ? (
        <div>
        <p>Welcome, {user.displayName}!</p>
        <Search/>
        </div>
      ) : (
        <p>You are not signed in. Please sign in to access the chat room.</p>
      )}
    </div>
  );
};

export default Home;
