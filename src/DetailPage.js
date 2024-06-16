import React, { useState, useEffect } from 'react';
import './DetailPage.css';
import './Sidebar.css'; // Make sure this is imported
import Papa from 'papaparse';
import Sidebar from './Sidebar';
import csvFile from './final.csv'; // Ensure this path is correct

const DetailPage = () => {
  const [choiceData, setChoiceData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [originalData, setOriginalData] = useState([]);

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
    if (choiceData) {
      const filtered = originalData.filter(row =>
        row['Institute'] === choiceData.college &&
        row['SeatType'] === choiceData.seatType &&
        row['Year'] === choiceData.year &&
        row['Gender'] === choiceData.gender
      );
      setFilteredData(filtered);
    }
  }, [choiceData, originalData]);

  return (
    <div className="detail-page">
      <header className="header">
        <h1>Josaa Analysis Portal</h1>
      </header>
      <div className="content-wrapper">
        <div className="sidebar-container">
          <Sidebar setChoiceData={setChoiceData} />
        </div>
        <div className="content-container">
          <h2>Tailor according to your need</h2>
          {filteredData && filteredData.length > 0 && (
            <div className="cards-container">
              {filteredData.map((row, index) => (
                <div className="card" key={index}>
                  <div className="card-header">{row.Institute}</div>
                  <div className="card-body">
                    <p><strong>Academic Program:</strong> {row['Academic Program Name']}</p>
                    <p><strong>Seat Type:</strong> {row['SeatType']}</p>
                    <p><strong>Gender:</strong> {row.Gender}</p>
                    <p><strong>Opening Rank:</strong> {row['Opening Rank']}</p>
                    <p><strong>Closing Rank:</strong> {row['Closing Rank']}</p>
                    <p><strong>Year:</strong> {row.Year}</p>
                    <p><strong>Round:</strong> {row.Round}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
