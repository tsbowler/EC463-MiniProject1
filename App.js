/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
// src/App.js
import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import GoogleLoginButton from './components/googleLoginButton';
// import Home from './components/Home';
import Register from './pages/register';
import "./style.scss"

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="" element={<GoogleLoginButton/>} /> {/* Make GoogleLoginButton the landing page */}
    //     <Route path="/home" element={<Home/>} />
    //   </Routes>
    // </Router>
 
    <Register/>

  );
}

export default App;
