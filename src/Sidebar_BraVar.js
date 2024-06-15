import React from 'react';
import './Sidebar_BraVar.css'; // Import the CSS file for the sidebar

const Sidebar_BraVar = ({ programTypes, selectedProgramTypes, handleProgramTypeChange }) => {
  return (
    <div className="sidebar">
      <h3>Filter by Program Type:</h3>
      {programTypes.map(type => (
        <div key={type} className="checkbox-container">
          <input
            type="checkbox"
            id={type}
            value={type}
            checked={selectedProgramTypes.includes(type)}
            onChange={handleProgramTypeChange}
          />
          <label htmlFor={type}>{type}</label>
        </div>
      ))}
    </div>
  );
};

export default Sidebar_BraVar;
