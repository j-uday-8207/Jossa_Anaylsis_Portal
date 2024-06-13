// src/DetailPage.js
import React from 'react';
import './DetailPage.css';
import Sidebar from './Sidebar';

const DetailPage = () => {
  return (
    <div>
      <header className="header">
        <h1>Josaa Analysis Portal</h1>
      </header>
      <div className="container">
        <Sidebar />
        <div className="content">
          <h2>What is the average rank of students admitted to the IITs in different branches?</h2>
          {/* Your graph component will be imported and used here */}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
