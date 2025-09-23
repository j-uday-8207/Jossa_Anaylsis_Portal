import React, { useState, useEffect } from 'react';
import './DetailPage.css';
import './Sidebar.css'; // Make sure this is imported
import Papa from 'papaparse';
import Sidebar from './Sidebar';
// Ensure this path is correct

const DetailPage = () => {
  const [choiceData, setChoiceData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('DetailPage: Starting to fetch CSV data...');
    setLoading(true);
    fetch('/final.csv')
      .then(response => {
        console.log('DetailPage: CSV response received', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(csvData => {
        console.log('DetailPage: CSV data length:', csvData.length);
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            console.log('DetailPage: CSV parsed, rows:', results.data.length);
            console.log('DetailPage: Sample row:', results.data[0]);
            setOriginalData(results.data);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV file:', error);
            setError('Error parsing CSV data');
            setLoading(false);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching CSV file:', error);
        setError('Error fetching CSV data');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log('DetailPage: choiceData changed:', choiceData);
    console.log('DetailPage: originalData length:', originalData.length);
    if (choiceData) {
      const filtered = originalData.filter(row =>
        row['Institute'] === choiceData.college &&
        row['SeatType'] === choiceData.seatType &&
        row['Year'] === choiceData.year &&
        row['Gender'] === choiceData.gender
      );
      console.log('DetailPage: Filtered results:', filtered.length);
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
          {loading && <div className="loading">Loading data...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && !choiceData && (
            <div className="info">Please select filters from the sidebar to view results.</div>
          )}
          {!loading && !error && choiceData && (!filteredData || filteredData.length === 0) && (
            <div className="info">No data found for the selected criteria. Try different filters.</div>
          )}
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
