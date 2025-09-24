import React, { useState, useEffect } from 'react';
import './DetailPage5.css';
import Papa from 'papaparse';
import Sidebar5 from './Sidebar5';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailPage5 = () => {
  const [choiceData, setChoiceData] = useState(null);
  const [averageRanks, setAverageRanks] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [programsToShow, setProgramsToShow] = useState(10); // Number of programs to display

  useEffect(() => {
    console.log('Fetching CSV data...');
    fetch('/final.csv')
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
    labels: averageRanks.map(item => 
      item.program.length > 30 
        ? item.program.substring(0, 30) + '...' 
        : item.program
    ),
    datasets: [
      {
        label: 'Average Rank',
        data: averageRanks.map(item => item.avgRank),
        backgroundColor: averageRanks.map((_, index) => {
          const colors = [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(83, 102, 255, 0.8)',
            'rgba(255, 99, 255, 0.8)',
            'rgba(99, 255, 132, 0.8)'
          ];
          return colors[index % colors.length];
        }),
        borderColor: averageRanks.map((_, index) => {
          const colors = [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(255, 99, 255, 1)',
            'rgba(99, 255, 132, 1)'
          ];
          return colors[index % colors.length];
        }),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: averageRanks.map((_, index) => {
          const colors = [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(255, 99, 255, 1)',
            'rgba(99, 255, 132, 1)'
          ];
          return colors[index % colors.length];
        })
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Average Rank Analysis - Top ${programsToShow} Programs (${choiceData?.year || 'Select Year'})`,
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3498db',
        borderWidth: 1,
        cornerRadius: 10,
        displayColors: true,
        callbacks: {
          title: function(context) {
            const fullProgram = averageRanks[context[0].dataIndex].program;
            return fullProgram;
          },
          label: function(context) {
            return `Average Rank: ${Math.round(context.parsed.y).toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Academic Programs',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#ffffff'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: 11
          },
          color: '#ffffff'
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Average Rank',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#ffffff'
        },
        ticks: {
          beginAtZero: false,
          font: {
            size: 12
          },
          color: '#ffffff',
          callback: function(value) {
            return value.toLocaleString();
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
          lineWidth: 1
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Average Rank Analysis by Branch</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label htmlFor="programs-select" style={{ fontSize: '14px', color: '#2c3e50' }}>
                Show Programs:
              </label>
              <select 
                id="programs-select"
                value={programsToShow} 
                onChange={(e) => setProgramsToShow(parseInt(e.target.value))}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #3498db',
                  borderRadius: '6px',
                  backgroundColor: '#fff',
                  color: '#2c3e50',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value={5}>Top 5</option>
                <option value={10}>Top 10</option>
                <option value={15}>Top 15</option>
                <option value={20}>Top 20</option>
                <option value={25}>Top 25</option>
              </select>
            </div>
          </div>
          {averageRanks.length > 0 && (
            <div className="chart-container" style={{ height: '600px', marginTop: '30px' }}>
              <div className="chart-inner-container" style={{ height: '100%' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
          {choiceData && averageRanks.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '10px',
              marginTop: '30px',
              color: '#6c757d'
            }}>
              <h3>No data available for the selected criteria</h3>
              <p>Please try selecting a different year from the sidebar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage5;
