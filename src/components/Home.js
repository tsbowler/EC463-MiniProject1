import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; 
import Search from './Search';
import GoogleSignoutButton from './GoogleSignoutButton';

const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <h2>Welcome to the Chat Room</h2>
      {user ? (
        <div>
          <GoogleSignoutButton/>
          <p>Welcome, {user.displayName}!</p>
          <Search authenticatedUserId={user.uid} />
        </div>
      ) : (
        <p>You are not signed in. Please sign in to access the chat room.</p>
      )}
    </div>
  );
};

export default Home;