// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import DetailPage from './DetailPage';

import DetailPage3 from './DetailPage3';
import DetailPage4 from './DetailPage4';
import DetailPage5 from './DetailPage5';
import DetailPage6 from './DetailPage6';



import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/DetailPage" element={<DetailPage />} />
        
        <Route path="/DetailPage3" element={<DetailPage3 />} />
        <Route path="/DetailPage4" element={<DetailPage4 />} />
        <Route path="/DetailPage5" element={<DetailPage5 />} />
        <Route path="/DetailPage6" element={<DetailPage6 />} />
        
        


      </Routes>
    </Router>
  );
}

export default App;
