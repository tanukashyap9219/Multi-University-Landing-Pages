import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage1 from './components/LandingPage1';
import LandingPage2 from './components/LandingPage2';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage1 />} />
        <Route path="/amity" element={<LandingPage1 />} />
        <Route path="/vit" element={<LandingPage2 />} />
      </Routes>
    </Router>
  );
}

export default App;

