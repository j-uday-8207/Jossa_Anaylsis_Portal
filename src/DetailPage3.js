import React, { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';

import './DetailPage3.css'; // Import CSS for DetailPage3
// CSV file will be fetched from public folder
import Sidebar3 from './Sidebar3';

const DetailPage3 = () => {
    const [data, setData] = useState({});
    const [filteredYear, setFilteredYear] = useState([2016, 2022]);

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

        csvData.forEach((row) => {
            const year = row.Year;
            const seatType = row.SeatType;
            const closingRank = parseInt(row['Closing Rank'], 10);

            if (!results[seatType]) {
                results[seatType] = {};
            }

            if (!results[seatType][year]) {
                results[seatType][year] = [];
            }

            results[seatType][year].push(closingRank);
        });

        // Average the ranks for each seat type and year
        for (const seatType in results) {
            for (const year in results[seatType]) {
                const ranks = results[seatType][year];
                const avgRank = ranks.reduce((a, b) => a + b, 0) / ranks.length;
                results[seatType][year] = avgRank;
            }
        }

        setData(results);
    };

    const prepareChartData = () => {
        const years = Array.from(new Set(Object.values(data).flatMap(seatTypeData => Object.keys(seatTypeData))));
        years.sort();
        const filteredYears = years.filter(year => year >= filteredYear[0] && year <= filteredYear[1]);

        const datasets = Object.keys(data).map(seatType => ({
            label: seatType,
            data: filteredYears.map(year => data[seatType][year] || null),
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

    return (
        <div className="detail-page3"> {/* Updated class name */}
            <Sidebar3 setFilteredYear={setFilteredYear} />
            <div className="content3"> {/* Updated class name */}
                <h1>Evolution of Cutoff Ranks for Different Categories</h1>
                <div className="chart-container"> {/* New wrapper for the chart */}
                    <Line 
                        data={prepareChartData()} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Ensure the chart respects its container size
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 5000,
                                    },
                                    title: {
                                        display: true,
                                        text: 'Rank',
                                    },
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Year',
                                    },
                                },
                            },
                        }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailPage3;
