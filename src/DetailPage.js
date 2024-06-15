import React, { useState, useEffect } from 'react';
import './DetailPage.css';
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
         // Log first 100 chars of CSV data
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            // console.log('Parsed CSV data:', results.data);
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
      console.log('Filtering with choiceData:', choiceData);
      
      const filtered = originalData.filter(row =>
        (row['Institute'] === choiceData.college) &&
        ( row['SeatType'] === choiceData.seatType) &&
        ( row['Year'] === choiceData.year) &&
        (row['Gender'] === choiceData.gender)
      );
      console.log('Filtered data:', filtered);
      setFilteredData(filtered);
    }
  }, [choiceData, originalData]);

  return (
    <div>
      <header className="header">
        <h1>Josaa Analysis Portal</h1>
      </header>
      <div className="container">
        <Sidebar setChoiceData={setChoiceData} />
        <div className="content">
          <h2>What is the average rank of students admitted to the IITs in different branches?</h2>
         
          {filteredData && (
            <div>
              
              <table>
                <thead>
                  <tr>
                    <th>Institute</th>
                    <th>Academic Program Name</th>
                    <th>Seat Type</th>
                    <th>Gender</th>
                    <th>Opening Rank</th>
                    <th>Closing Rank</th>
                    <th>Year</th>
                    <th>Round</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.Institute}</td>
                      <td>{row['Academic Program Name']}</td>
                      <td>{row['SeatType']}</td>
                      <td>{row.Gender}</td>
                      <td>{row['Opening Rank']}</td>
                      <td>{row['Closing Rank']}</td>
                      <td>{row.Year}</td>
                      <td>{row.Round}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;