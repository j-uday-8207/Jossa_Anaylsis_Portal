import React, { useState, useEffect } from 'react';
import './DetailPage5.css';
import Papa from 'papaparse';
import Sidebar5 from './Sidebar5';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import csvFilePath from './final.csv';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailPage5 = () => {
  const [choiceData, setChoiceData] = useState(null);
  const [averageRanks, setAverageRanks] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [programsToShow, setProgramsToShow] = useState(10); // Number of programs to display

  useEffect(() => {
    console.log('Fetching CSV data...');
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvData => {
        console.log('CSV data fetched:', csvData);
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            console.log('CSV data parsed:', results.data);
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
      console.log('Filtering data with choiceData:', choiceData);
      const filtered = originalData.filter(row =>
        (row.Gender === 'Gender-Neutral' || row.Gender === '') &&
        row.Year === choiceData.year
      );

      const programRanks = {};
      filtered.forEach(row => {
        const program = row['Academic Program Name'];
        if (!programRanks[program]) {
          programRanks[program] = { openingRank: null, closingRank: null };
        }
        if (row.Round === '1') {
          programRanks[program].openingRank = parseInt(row['Opening Rank']);
        }
        if (row.Round === '6') {
          programRanks[program].closingRank = parseInt(row['Closing Rank']);
        }
      });

      const averageRanks = Object.keys(programRanks).map(program => {
        const ranks = programRanks[program];
        const avgRank = (ranks.openingRank + ranks.closingRank) / 2;
        return { program, avgRank };
      });

      console.log('Calculated average ranks:', averageRanks);
      setAverageRanks(averageRanks.slice(0, programsToShow)); // Limit the number of programs displayed
    }
  }, [choiceData, originalData, programsToShow]);

  const chartData = {
    labels: averageRanks.map(item => item.program),
    datasets: [
      {
        label: 'Average Rank',
        data: averageRanks.map(item => item.avgRank),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Rank of Students Admitted to IITs in Different Branches',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Academic Programs'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Average Rank'
        },
        ticks: {
          beginAtZero: true, // Ensure the y-axis starts from zero
        }
      }
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Josaa Analysis Portal</h1>
      </header>
      <div className="container">
        <Sidebar5 setChoiceData={setChoiceData} originalData={originalData} />
        <div className="content">
          <h2>Average Rank of Students Admitted to IITs in Different Branches</h2>
          {averageRanks.length > 0 && (
            <div className="chart-container">
              <div className="chart-inner-container">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage5;
