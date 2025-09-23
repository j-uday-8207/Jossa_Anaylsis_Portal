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
        const chartDataSets = institutes.map(institute => {
            const data = selectedYears.map(year => {
                const yearData = yearlyData[year] || [];
                const instituteData = yearData.find(item => item.Institute === institute);
                return instituteData ? instituteData.MaxClosingRank : null;
            });
            return {
                label: institute,
                data,
                borderColor: getRandomColor(),
                fill: false,
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

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
                        <div className="chart-container2">
                            <h2>Chart</h2>
                            <Line data={chartData} options={{ responsive: true }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPage2;
