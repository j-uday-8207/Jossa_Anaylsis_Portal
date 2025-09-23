  import React, { useState, useEffect } from 'react';
  import './Sidebar.css';
  import { Link } from 'react-router-dom';
  import Papa from 'papaparse';

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
      // Fetch and parse CSV to extract unique filter values
      console.log('Sidebar: Fetching CSV for filter options...');
      fetch('/final.csv')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(csvData => {
          Papa.parse(csvData, {
            header: true,
            complete: (results) => {
              console.log('Sidebar: CSV parsed for filters, rows:', results.data.length);
              
              // Extract unique values for each filter
              const uniqueValues = {
                college: [...new Set(results.data.map(row => row.Institute).filter(Boolean))],
                seatType: [...new Set(results.data.map(row => row.SeatType).filter(Boolean))],
                year: [...new Set(results.data.map(row => row.Year).filter(Boolean))],
                gender: [...new Set(results.data.map(row => row.Gender).filter(Boolean))]
              };
              
              console.log('Sidebar: Unique filter values:', uniqueValues);
              setFilters(uniqueValues);
            },
            error: (error) => {
              console.error('Error parsing CSV file:', error);
              setError('Error loading filter options');
            }
          });
        })
        .catch(error => {
          console.error('Error fetching CSV file:', error);
          setError('Error fetching filter options');
        });
    }, []);

    const handleApplyFilter = (e) => {
      e.preventDefault();
      
      const filterData = {
        college,
        seatType,
        year,
        gender
      };
    
      console.log('Sidebar: Applying filters:', filterData);
      setResponseMessage('Filters applied successfully.');
      setChoiceData(filterData); // Pass filtered data to DetailPage
      setError('');
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
