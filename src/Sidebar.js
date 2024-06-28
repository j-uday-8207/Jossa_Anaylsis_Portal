  import React, { useState, useEffect } from 'react';
  import './Sidebar.css';
  import { Link } from 'react-router-dom';
  import axios from 'axios';

  const Sidebar = ({ setChoiceData }) => {
    const [filters, setFilters] = useState({
      college: [],
      seatType: [],
      year: [],
      gender: []
    });

    const [college, setCollege] = useState('');
    const [seatType, setSeatType] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      axios.get('https://jossa-anaylsis-portal.onrender.com/api/choices')
        .then(response => {
          const data = response.data;
          setFilters({
            college: data.Institute, // Mapping Institute to college
            seatType: data.SeatType,
            year: data.Year,
            gender: data.Gender
          });
        })
        .catch(error => {
          console.error('Error fetching filter choices:', error);
        });
    }, []);

    const handleApplyFilter = (e) => {
      e.preventDefault();
      
      const filters = {
        college,
        seatType,
        year,
        gender
      };
    
      axios.post('https://jossa-anaylsis-portal.onrender.com/api/data', filters)
        .then(response => {
          setResponseMessage('Filters applied successfully.');
          setChoiceData(response.data); // Pass filtered data to DetailPage
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

    

    return (
      <div className="sidebar">
        <Link to="/">
          <button className="back-button">Go Back</button>
        </Link>
        <h3>Filters</h3>
        <label htmlFor="college">College</label>
        <select id="college" value={college} onChange={(e) => setCollege(e.target.value)}>
          <option value="">Select College</option>
          {filters.college.map((college, index) => (
            <option key={index} value={college}>{college}</option>
          ))}
        </select>

        <label htmlFor="seat-type">Seat Type</label>
        <select id="seat-type" value={seatType} onChange={(e) => setSeatType(e.target.value)}>
          <option value="">Select Seat Type</option>
          {filters.seatType.map((seatType, index) => (
            <option key={index} value={seatType}>{seatType}</option>
          ))}
        </select>

        <label htmlFor="year">Year</label>
        <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          {filters.year.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>

        <label htmlFor="gender">Gender</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          {filters.gender.map((gender, index) => (
            <option key={index} value={gender}>{gender}</option>
          ))}
        </select>

        <button className="apply-button" onClick={handleApplyFilter}>Apply Filter</button>
        <button className="clear-button" onClick={handleClearSelections}>Clear Selections</button>
        
        {error && <p>{error}</p>}
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    );
  }

  export default Sidebar;
