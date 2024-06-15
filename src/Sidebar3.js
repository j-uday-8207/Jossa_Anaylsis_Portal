import React, { useState } from 'react';
import './Sidebar3.css';
import { Link } from 'react-router-dom';
const Sidebar3 = ({ setFilteredYear }) => {
    const [selectedYear, setSelectedYear] = useState({ start: 2016, end: 2022 });

    const handleYearChange = (e) => {
        const { name, value } = e.target;
        setSelectedYear(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const applyFilter = () => {
        setFilteredYear([selectedYear.start, selectedYear.end]);
    };

    const clearSelections = () => {
        setSelectedYear({ start: 2016, end: 2022 });
        setFilteredYear([2016, 2022]);
    };

    return (
        <div className="sidebar3">
             <Link to="/">
        <button className="back-button">Go Back</button>
            </Link>
            <div className="filters">
                <h3>Filters</h3>
                <label>
                    Start Year:
                    <input
                        type="number"
                        name="start"
                        value={selectedYear.start}
                        onChange={handleYearChange}
                        min="2016"
                        max="2022"
                    />
                </label>
                <label>
                    End Year:
                    <input
                        type="number"
                        name="end"
                        value={selectedYear.end}
                        onChange={handleYearChange}
                        min="2016"
                        max="2022"
                    />
                </label>
                <button className="apply-btn" onClick={applyFilter}>Apply Filter</button>
                <button className="clear-btn" onClick={clearSelections}>Clear Selections</button>
                <button className="show-table-btn">Show table</button>
            </div>
        </div>
    );
};

export default Sidebar3;
