// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import DetailPage from './DetailPage';
import DetailPage2 from './DetailPage2';
import DetailPage6 from './DetailPage6';
import Branches from './Branches';
import './App.css';






const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/DetailPage" element={<DetailPage />} />
        <Route path="/BranchesVar" element={<Branches/>}/>
        <Route path= "/DetailPage2" element={<DetailPage2/>}/>
        <Route path= "/DetailPage6" element={<DetailPage6/>}/>
        
        
        
        

      </Routes>
    </Router>
  );
}

export default App;
