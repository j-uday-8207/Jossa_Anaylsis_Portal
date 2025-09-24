import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
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
    const colors = [
      '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
      '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#8e44ad'
    ];
    
    const datasets = Object.keys(averageRanks).map((program, index) => ({
      label: program.replace('(4 Years, Bachelor of Technology)', '(B.Tech)'),
      data: labels.map(year => averageRanks[program][year] || null),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length] + '20',
      fill: false,
      tension: 0.1,
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBorderWidth: 2,
      pointHoverBorderWidth: 3,
      pointBackgroundColor: colors[index % colors.length],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: colors[index % colors.length]
    }));

    return {
      labels,
      datasets
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Branch Popularity Trends - Average Opening Ranks Over Years',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#ffffff',
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3498db',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: function(context) {
            return `Year ${context[0].label}`;
          },
          label: function(context) {
            const fullLabel = Object.keys(averageRanks)[context.datasetIndex];
            return `${fullLabel}: Rank ${parseInt(context.parsed.y).toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#ffffff'
        },
        grid: {
          display: true,
          color: 'rgba(255,255,255,0.2)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Average Opening Rank',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#ffffff'
        },
        grid: {
          display: true,
          color: 'rgba(255,255,255,0.2)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          },
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        tension: 0.1,
        borderWidth: 3
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        borderWidth: 2,
        hoverBorderWidth: 3
      }
    }
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
  const programTypes = [
    'Computer Science and Engineering (4 Years, Bachelor of Technology)', 
    'Chemical Engineering (4 Years, Bachelor of Technology)', 
    'Mechanical Engineering (4 Years, Bachelor of Technology)',
    'Civil Engineering (4 Years, Bachelor of Technology)',
    'Electronics and Communication Engineering (4 Years, Bachelor of Technology)',
    'Mathematics and Computing (4 Years, Bachelor of Technology)',
    'Biological Sciences and Bioengineering (4 Years, Bachelor of Technology)'
  ];

  return (
    <div>
      <header className="header-unique">
        <h1>Josaa Analysis Portal</h1>
      </header>
      <div className="main-container-unique">
        <div className="content-unique">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2>Branch Popularity Trends Analysis</h2>
            <button onClick={handleGoBack} className="go-back-button" style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}>
              ← Back to Home
            </button>
          </div>

          <div className="filters-unique" style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '12px',
            marginBottom: '30px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ 
              marginBottom: '20px', 
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Select Academic Programs to Compare:
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '15px'
            }}>
              {programTypes.map(type => (
                <div key={type} style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  padding: '10px 15px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} 
                onClick={() => {
                  const checkbox = document.getElementById(type);
                  checkbox.click();
                }}>
                  <input
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={selectedProgramTypes.includes(type)}
                    onChange={handleProgramTypeChange}
                    style={{
                      marginRight: '12px',
                      cursor: 'pointer',
                      transform: 'scale(1.2)'
                    }}
                  />
                  <label htmlFor={type} style={{
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#2c3e50',
                    fontWeight: selectedProgramTypes.includes(type) ? 'bold' : 'normal'
                  }}>
                    {type.replace('(4 Years, Bachelor of Technology)', '(B.Tech)')}
                  </label>
                </div>
              ))}
            </div>
            {selectedProgramTypes.length > 0 && (
              <div style={{ 
                marginTop: '15px',
                padding: '10px 15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#1565c0'
              }}>
                <strong>{selectedProgramTypes.length}</strong> program{selectedProgramTypes.length > 1 ? 's' : ''} selected for comparison
              </div>
            )}
          </div>

          {selectedProgramTypes.length > 0 && filteredData && filteredData.length > 0 && (
            <div className="canvas-container-unique" style={{ 
              height: '600px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '1px solid #e9ecef'
            }}>
              <Line className="LineChart-unique" data={getChartData()} options={chartOptions} />
            </div>
          )}

          {selectedProgramTypes.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 40px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '2px dashed #dee2e6',
              color: '#6c757d'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#495057' }}>
                Select Programs to View Trends
              </h3>
              <p>Choose one or more academic programs from the filters above to compare their popularity trends over the years.</p>
            </div>
          )}

          {selectedProgramTypes.length > 0 && (!filteredData || filteredData.length === 0) && (
            <div style={{
              textAlign: 'center',
              padding: '60px 40px',
              backgroundColor: '#fff3cd',
              borderRadius: '12px',
              border: '1px solid #ffeaa7',
              color: '#856404'
            }}>
              <h3 style={{ marginBottom: '15px' }}>No Data Available</h3>
              <p>No data found for the selected programs. This might be due to limited data availability for these specific programs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Branches;