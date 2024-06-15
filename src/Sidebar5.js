import React, { useState, useEffect } from 'react';
import './Sidebar5.css';
import { Link } from 'react-router-dom';
const Sidebar5 = ({ setChoiceData, originalData }) => {
  const [year, setYear] = useState('');
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {
    const uniquePrograms = [...new Set(originalData.map(item => item['Academic Program Name']))];
    setPrograms(uniquePrograms);
  }, [originalData]);

  const handleApplyFilter = () => {
    setChoiceData({ year, program: selectedProgram });
  };

  return (
    <div className="sidebar">
        <Link to="/">
        <button className="back-button">Go Back</button>
            </Link>
      <h3>Filters</h3>
      <label htmlFor="year">Year</label>
      <input
        id="year"
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <label htmlFor="academic-program">Academic Program</label>
      <select
        id="academic-program"
        value={selectedProgram}
        onChange={(e) => setSelectedProgram(e.target.value)}
      >
        <option value="">Select Program</option>
        {programs.map((program, index) => (
          <option key={index} value={program}>{program}</option>
        ))}
      </select>

      <button className="apply-button" onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
}

export default Sidebar5;
