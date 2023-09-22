import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleLoginButton from './components/GoogleLoginButton';
import Home from './components/Home';
import PrivateChat from './components/PrivateChat';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { addUserToFirestore } from './firebaseUtils'; // Import your utility function

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setLoading(false);
        addUserToFirestore(authUser); // Call the function to update user document with email
      } else {
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
        <Route path="/privateChat/:chatRoomId" element={<PrivateChat />} />
      </Routes>
    </Router>
  );
}

export default App;
