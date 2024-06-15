// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import DetailPage from './DetailPage';
import Branches from './Branches';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/DetailPage" element={<DetailPage />} />
        <Route path="/BranchesVar" element={<Branches/>}/>
      </Routes>
    </Router>
  );
}

export default App;
