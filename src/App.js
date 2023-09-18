import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GoogleLoginButton from './components/GoogleLoginButton';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import { useEffect, useState } from 'react';
import { auth, db } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is authenticated
        setLoading(false);
      } else {
        // User is not authenticated
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while Firebase authentication is initializing
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLoginButton />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/chatroom"
          element={user ? <ChatRoom user={user} db={db} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;