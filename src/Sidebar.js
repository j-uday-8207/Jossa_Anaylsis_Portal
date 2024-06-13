import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [college, setCollege] = useState('');
  const [seatType, setSeatType] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [FilteredMessage, setFilteredData] = useState('');
  const [error, setError] = useState('');

  const handleApplyFilter = (e) => {
    e.preventDefault();
    
    const filters = {
      college,
      seatType,
      year,
      gender
    };
  
    axios.post('http://localhost:3000/api/data', filters)
      .then(response => {
        // Assuming the response data is the same as the filters sent
        setResponseMessage('Filters applied successfully.');
        setFilteredData(response.data);
        setError('');
      })
      .catch(error => {
        console.error('There was an error:', error);
        setError('Error occurred. Please try again.');
        setResponseMessage('');
      });
  };

  const handleClearSelections = () => {
    setCollege('');
    setSeatType('');
    setYear('');
    setGender('');
  };

  const handleShowTable = () => {
    // Logic to show table based on selected filter options
    console.log("Table will be shown based on selected filter options");
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <button className="back-button">Go Back</button>
      </Link>
      <h3>Filters</h3>
      <label htmlFor="college">College</label>
      <select id="college" value={college} onChange={(e) => setCollege(e.target.value)}>
        <option value="">Select College</option>
        <option value="College A">College A</option>
        <option value="College B">College B</option>
        <option value="College C">College C</option>
      </select>

      <label htmlFor="seat-type">Seat Type</label>
      <select id="seat-type" value={seatType} onChange={(e) => setSeatType(e.target.value)}>
        <option value="">Select Seat Type</option>
        <option value="Type 1">Type 1</option>
        <option value="Type 2">Type 2</option>
        <option value="Type 3">Type 3</option>
      </select>

      <label htmlFor="year">Year</label>
      <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>

      <label htmlFor="gender">Gender</label>
      <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <button className="apply-button" onClick={handleApplyFilter}>Apply Filter</button>
      <button className="clear-button" onClick={handleClearSelections}>Clear Selections</button>
      <button className="show-table-button" onClick={handleShowTable}>Show Table</button>
      {error && <p>{error}</p>}
      {responseMessage && <p>{FilteredMessage.college}</p>}
    </div>
  );
}

export default Sidebar;
