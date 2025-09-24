import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Sidebar from './Sidebar2';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import './DetailPage2.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DetailPage2 = () => {
    const [selectedYears, setSelectedYears] = useState([]);
    const navigate = useNavigate();
    const [originalData, setOriginalData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [classification, setClassification] = useState('All');

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
                        const processedData = results.data.map(row => ({
                            Institute: row['Institute'],
                            ClosingRank: parseInt(row['Closing Rank']) || 0,
                            Year: parseInt(row['Year']),
                            SeatType: row['SeatType'],
                            Gender: row['Gender'],
                        }));
                        setOriginalData(processedData);
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
        if (selectedYears.length === 0) {
            setChartData({});
            return;
        }

        let filteredData = originalData.filter(row =>
            selectedYears.includes(row.Year) &&
            row.SeatType === 'OPEN' &&
            row.Gender !== 'Female-only (including Supernumerary)'
        );

        if (classification === 'Newer IITs') {
            filteredData = filteredData.filter(row =>
                !row.Institute.startsWith('Indian Institute  of Technology Bombay') &&
                !row.Institute.startsWith('Indian Institute  of Technology Delhi') &&
                !row.Institute.startsWith('Indian Institute  of Technology Kharagpur') &&
                !row.Institute.startsWith('Indian Institute  of Technology Kanpur') &&
                !row.Institute.startsWith('Indian Institute  of Technology Madras') &&
                !row.Institute.startsWith('Indian Institute  of Technology Roorkee') &&
                !row.Institute.startsWith('Indian Institute  of Technology Guwahati')
            );
        } else if (classification === 'Older IITs') {
            filteredData = filteredData.filter(row =>
                row.Institute.startsWith('Indian Institute  of Technology Bombay') ||
                row.Institute.startsWith('Indian Institute  of Technology Delhi') ||
                row.Institute.startsWith('Indian Institute  of Technology Kharagpur') ||
                row.Institute.startsWith('Indian Institute  of Technology Kanpur') ||
                row.Institute.startsWith('Indian Institute  of Technology Madras') ||
                row.Institute.startsWith('Indian Institute  of Technology Roorkee') ||
                row.Institute.startsWith('Indian Institute  of Technology Guwahati')
            );
        }

        const yearlyData = {};

        selectedYears.forEach(year => {
            const yearFilteredData = filteredData.filter(row => row.Year === year);
            const instituteClosingRanks = {};

            yearFilteredData.forEach(row => {
                const institute = row.Institute;
                const closingRank = row.ClosingRank;

                if (!instituteClosingRanks[institute]) {
                    instituteClosingRanks[institute] = closingRank;
                } else if (closingRank > instituteClosingRanks[institute]) {
                    instituteClosingRanks[institute] = closingRank;
                }
            });

            yearlyData[year] = Object.keys(instituteClosingRanks).map(institute => ({
                Institute: institute,
                MaxClosingRank: instituteClosingRanks[institute],
            }));
        });

        const institutes = Array.from(new Set(filteredData.map(row => row.Institute)));
        const chartDataSets = institutes.map((institute, index) => {
            const data = selectedYears.map(year => {
                const yearData = yearlyData[year] || [];
                const instituteData = yearData.find(item => item.Institute === institute);
                return instituteData ? instituteData.MaxClosingRank : null;
            });
            const color = getRandomColor();
            return {
                label: institute.replace('Indian Institute  of Technology ', 'IIT '),
                data,
                borderColor: color,
                backgroundColor: color + '20',
                fill: false,
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 3,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color
            };
        });

        setChartData({
            labels: selectedYears,
            datasets: chartDataSets,
        });

    }, [selectedYears, originalData, classification]);

    const handleYearChange = (selectedYears) => {
        const sortedYears = selectedYears.sort((a, b) => a - b);
        setSelectedYears(sortedYears);
    };

    const handleClassificationChange = (selectedClassification) => {
        setClassification(selectedClassification);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `${classification} Closing Rank Trends`,
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#ffffff'
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
                    color: '#ffffff'
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
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
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
                    text: 'Closing Rank',
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

    const getRandomColor = () => {
        const colors = [
            '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
            '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#8e44ad',
            '#16a085', '#27ae60', '#2980b9', '#d35400', '#c0392b'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="detail-page2">
            <header className="header2">
                <h1>Josaa Analysis Portal</h1>
            </header>
            <div className="container2">
                <Sidebar handleYearChange={handleYearChange} />
                <div className="content2">
                    <h2>Old vs New</h2>
                    <div className="go-back-container2">
                        <button onClick={handleGoBack} className="go-back-button2">&#8592;</button>
                    </div>
                    
                    <div className="classification-buttons2">
                        <button
                            className={`classification-button2 ${classification === 'All' ? 'active' : ''}`}
                            onClick={() => handleClassificationChange('All')}
                        >
                            All Institutes
                        </button>
                        <button
                            className={`classification-button2 ${classification === 'Newer IITs' ? 'active' : ''}`}
                            onClick={() => handleClassificationChange('Newer IITs')}
                        >
                            Newer IITs
                        </button>
                        <button
                            className={`classification-button2 ${classification === 'Older IITs' ? 'active' : ''}`}
                            onClick={() => handleClassificationChange('Older IITs')}
                        >
                            Older IITs
                        </button>
                    </div>
                    {selectedYears.length > 0 && chartData.datasets && chartData.datasets.length > 0 && (
                        <div className="chart-container2" style={{ height: '500px', marginTop: '30px' }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPage2;
