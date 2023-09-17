import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleLoginButton from './components/GoogleLoginButton';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import { db } from './firebase';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLoginButton/>} /> {/* Make GoogleLoginButton the landing page */}
        <Route path="/home" element={<Home/>} />
        <Route path="/chatroom" element={<ChatRoom db={db} />} />
      </Routes>
    </Router>
  );
}

export default App;
