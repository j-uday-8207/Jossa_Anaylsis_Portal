// src/Sidebar6.js
import './Sidebar6.css';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFile from './final.csv'; // Ensure final.csv is in src folder
import { Link } from 'react-router-dom';
const Sidebar6 = ({ setChoiceData }) => {
  const [formData, setFormData] = useState({
    program: '',
    year: '',
    seatType: '',
    gender: '',
    round: '',
    rank: '',
  });

  const [programs, setPrograms] = useState([]);
  const [years, setYears] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    fetch(csvFile)
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
            const data = results.data;
            const uniquePrograms = [...new Set(data.map(row => row['Academic Program Name']))];
            const uniqueYears = [...new Set(data.map(row => row['Year']))];
            const uniqueSeatTypes = [...new Set(data.map(row => row['SeatType']))];
            const uniqueGenders = [...new Set(data.map(row => row['Gender']))];
            const uniqueRounds = [...new Set(data.map(row => row['Round']))];

            setPrograms(uniquePrograms);
            setYears(uniqueYears);
            setSeatTypes(uniqueSeatTypes);
            setGenders(uniqueGenders);
            setRounds(uniqueRounds);
          },
          error: (error) => {
            console.error('Error parsing CSV file:', error);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching CSV file:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChoiceData(formData);
  };

  return (
    <div className="sidebar">
       <Link to="/">
        <button className="back-button">Go Back</button>
            </Link>
      <h3>Choose Filters:</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="program">Program:</label>
          <select id="program" name="program" value={formData.program} onChange={handleChange}>
            <option value="">Select Program</option>
            {programs.map((program, index) => (
              <option key={index} value={program}>{program}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <select id="year" name="year" value={formData.year} onChange={handleChange}>
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="seatType">Seat Type:</label>
          <select id="seatType" name="seatType" value={formData.seatType} onChange={handleChange}>
            <option value="">Select Seat Type</option>
            {seatTypes.map((seatType, index) => (
              <option key={index} value={seatType}>{seatType}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="round">Round:</label>
          <select id="round" name="round" value={formData.round} onChange={handleChange}>
            <option value="">Select Round</option>
            {rounds.map((round, index) => (
              <option key={index} value={round}>{round}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rank">Rank:</label>
          <input type="text" id="rank" name="rank" value={formData.rank} onChange={handleChange} />
        </div>
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
}

export default Sidebar6;