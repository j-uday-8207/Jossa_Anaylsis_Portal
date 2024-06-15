import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import csvFile from './final.csv';
import './Branches.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Branches = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [averageRanks, setAverageRanks] = useState({});
  const [selectedProgramTypes, setSelectedProgramTypes] = useState([]);

  const navigate = useNavigate();

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
    if (originalData.length === 0) return;

    const filtered = originalData.filter(row =>
      row['Round'] === '6' &&
      row['SeatType'] === 'OPEN' &&
      row['Gender'] === 'Gender-Neutral' &&
      selectedProgramTypes.includes(row['Academic Program Name'])
    );

    setFilteredData(filtered);

    const programYearMap = {};

    filtered.forEach(row => {
      const program = row['Academic Program Name'];
      const year = row['Year'];
      const openingRank = parseInt(row['Opening Rank'], 10);

      if (!programYearMap[program]) {
        programYearMap[program] = {};
      }

      if (!programYearMap[program][year]) {
        programYearMap[program][year] = {
          totalRank: 0,
          count: 0
        };
      }

      programYearMap[program][year].totalRank += openingRank;
      programYearMap[program][year].count += 1;
    });

    const averages = {};

    for (const program in programYearMap) {
      averages[program] = {};
      for (const year in programYearMap[program]) {
        const data = programYearMap[program][year];
        averages[program][year] = (data.totalRank / data.count).toFixed(0);
      }
    }

    setAverageRanks(averages);
  }, [originalData, selectedProgramTypes]);

  const getChartData = () => {
    if (!averageRanks) return null;

    const labels = [...new Set(Object.values(averageRanks).flatMap(program => Object.keys(program)))].sort();
    const datasets = Object.keys(averageRanks).map(program => ({
      label: program,
      data: labels.map(year => averageRanks[program][year] || null),
      borderColor: getRandomColor(),
      fill: false
    }));

    return {
      labels,
      datasets
    };
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleProgramTypeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedProgramTypes([...selectedProgramTypes, value]);
    } else {
      setSelectedProgramTypes(selectedProgramTypes.filter(type => type !== value));
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Example list of program types for the dropdown
  const programTypes = ['Computer Science and Engineering (4 Years, Bachelor of Technology)', 'Chemical Engineering (4 Years, Bachelor of Technology)', 'Mechanical Engineering (4 Years, Bachelor of Technology)',
    'Civil Engineering (4 Years, Bachelor of Technology)','Electronics and Communication Engineering (4 Years, Bachelor of Technology)','Mathematics and Computing (4 Years, Bachelor of Technology)',
    'Biological Sciences and Bioengineering (4 Years, Bachelor of Technology)'
  ];

  return (
    <div>
      <header className="header-unique">
        <h1>Josaa Analysis Portal</h1>
      </header>
      <div className="main-container-unique">
        <div className="content-unique">
          <h2>What is the average rank of students admitted to the IITs in different branches?</h2>
          <div className="filters-unique">
            <h3>Filter by Program Type:</h3>
            {programTypes.map(type => (
              <div key={type}>
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
          <div className="go-back-container">
            <button onClick={handleGoBack} className="go-back-button">&#8592;</button>
          </div>
          {filteredData && (
            <div className="canvas-container-unique">
              <h3>Filtered Data:</h3>
              <Line className="LineChart-unique" data={getChartData()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Branches;
