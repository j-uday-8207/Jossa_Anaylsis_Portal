// src/DetailPage6.js

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Sidebar6 from './Sidebar6';
import './DetailPage6.css'; // Ensure this file exists in src folder
import csvFile from './final.csv'; // Ensure final.csv is in src folder

const DetailPage6 = () => {
  const [choiceData, setChoiceData] = useState({
    program: '',
    year: '',
    seatType: '',
    gender: '',
    round: '',
    rank: '',
  });
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetch("/final.csv")
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
            setOriginalData(results.data);
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

  useEffect(() => {
    if (originalData.length > 0) {
      const filtered = originalData.filter(row =>
        (!choiceData.program || row['Academic Program Name'] === choiceData.program) &&
        (!choiceData.year || row['Year'] === choiceData.year) &&
        (!choiceData.seatType || row['SeatType'] === choiceData.seatType) &&
        (!choiceData.gender || row['Gender'] === choiceData.gender) &&
        (!choiceData.round || row['Round'] === choiceData.round) &&
        (
          parseInt(row['Closing Rank']) >= parseInt(choiceData.rank))
      );
      setFilteredData(filtered);
    }
  }, [choiceData, originalData]);

  return (
    <div>
      <header className="header">
        <h1>College Predictor</h1>
      </header>
      <div className="container">
        <Sidebar6 setChoiceData={setChoiceData} />
        <div className="content">
          <h2>College Predictions Based on Criteria</h2>
          {filteredData.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Institute Name</th>
                    <th>Program</th>
                    <th>Round</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.Institute}</td>
                      <td>{row['Academic Program Name']}</td>
                      <td>{row.Round}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage6;
