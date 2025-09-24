import React, { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from 'chart.js';
import Sidebar4 from './Sidebar4';
import './DetailPage4.css';
// CSV file will be fetched from public folder

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

const DetailPage4 = () => {
    const [data, setData] = useState({});
    const [filteredYear, setFilteredYear] = useState([2016, 2022]);
    const [selectedPrograms, setSelectedPrograms] = useState([]);

    const fetchData = useCallback(() => {
        fetch('/final.csv')
            .then(response => response.text())
            .then(csvData => {
                Papa.parse(csvData, {
                    header: true,
                    complete: (results) => {
                        processCSVData(results.data);
                    },
                });
            })
            .catch(error => {
                console.error('Error fetching CSV file:', error);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const processCSVData = (csvData) => {
        const results = {};

        const round1Data = csvData.filter(row => row.Round === '1');
        const round6Data = csvData.filter(row => row.Round === '6');

        round1Data.forEach((row) => {
            const year = row.Year;
            const programName = row['Academic Program Name'];

            if (programName && programName.toLowerCase().includes('dual degree')) {
                if (!results[programName]) {
                    results[programName] = {};
                }

                if (!results[programName][year]) {
                    results[programName][year] = 0;
                }

                const round1Row = round1Data.find(r => r.Year === year && r['Academic Program Name'] === programName);
                const round6Row = round6Data.find(r => r.Year === year && r['Academic Program Name'] === programName);

                if (round1Row && round6Row) {
                    const openingRank = parseInt(round1Row['Opening Rank'], 10);
                    const closingRank = parseInt(round6Row['Closing Rank'], 10);

                    if (!isNaN(openingRank) && !isNaN(closingRank)) {
                        results[programName][year] += closingRank - openingRank + 1;
                    }
                }
            }
        });

        setData(results);
    };

    const prepareChartData = () => {
        if (!Object.keys(data).length) return { labels: [], datasets: [] };

        const years = Array.from(new Set(Object.values(data).flatMap(programData => Object.keys(programData))));
        years.sort();
        const filteredYears = years.filter(year => year >= filteredYear[0] && year <= filteredYear[1]);

        const truncateLabel = (label, maxLength) => {
            if (label.length <= maxLength) return label;
            return label.substring(0, maxLength) + '...';
        };

        const datasets = (selectedPrograms.length > 0 ? selectedPrograms : Object.keys(data)).map(program => ({
            label: truncateLabel(program, 20), // Truncate legend name to 20 characters
            data: filteredYears.map(year => data[program]?.[year] || 0),
            fill: false,
            borderColor: getRandomColor(),
        }));

        return {
            labels: filteredYears,
            datasets: datasets,
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

    const filteredLegendItems = () => {
        const programsToShow = selectedPrograms.length > 0 ? selectedPrograms : Object.keys(data);
        return programsToShow.map(program => ({
            label: program,
            color: getRandomColor(),
        }));
    };

    return (
        <div className="detail-page4">
            <Sidebar4 setFilteredYear={setFilteredYear} setSelectedPrograms={setSelectedPrograms} data={data} />
            <div className="content">
                <h1>Trend of Students Opting for Dual Degree Programs</h1>
                <div className="chart-container">
                    <div className="canvas-container">
                        <Line 
                            data={prepareChartData()} 
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Dual Degree Program Trends',
                                        font: {
                                            size: 16,
                                            weight: 'bold'
                                        },
                                        color: '#ffffff'
                                    },
                                    legend: {
                                        display: selectedPrograms.length !== 1,
                                        labels: {
                                            boxWidth: 10,
                                            boxHeight: 10,
                                            font: {
                                                size: 10,
                                            },
                                            color: '#ffffff'
                                        },
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1000,
                                            color: '#ffffff'
                                        },
                                        title: {
                                            display: true,
                                            text: 'Number of Students',
                                            color: '#ffffff'
                                        },
                                        grid: {
                                            color: 'rgba(255,255,255,0.2)'
                                        }
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Year',
                                            color: '#ffffff'
                                        },
                                        ticks: {
                                            color: '#ffffff'
                                        },
                                        grid: {
                                            color: 'rgba(255,255,255,0.2)'
                                        }
                                    },
                                }
                            }} 
                        />
                    </div>
                    {selectedPrograms.length > 1 && (
                        <div className="legend-container">
                            {filteredLegendItems().map(dataset => (
                                <div key={dataset.label} className="legend-item" title={dataset.label}>
                                    <span className="legend-color-box" style={{ backgroundColor: dataset.color }}></span>
                                    {dataset.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPage4;
