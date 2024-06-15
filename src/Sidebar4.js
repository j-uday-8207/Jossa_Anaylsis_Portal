import React, { useState, useEffect } from 'react';
import './Sidebar4.css';
import { Link } from 'react-router-dom';

const Sidebar4 = ({ setFilteredYear, setSelectedPrograms, data }) => {
    const [selectedYear, setSelectedYear] = useState({ start: 2016, end: 2022 });
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');

    useEffect(() => {
        if (data && Object.keys(data).length) {
            setPrograms(Object.keys(data));
        }
    }, [data]);

    const handleYearChange = (e) => {
        const { name, value } = e.target;
        setSelectedYear(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProgramChange = (e) => {
        setSelectedProgram(e.target.value);
    };

    const applyFilter = () => {
        setFilteredYear([selectedYear.start, selectedYear.end]);
        setSelectedPrograms(selectedProgram ? [selectedProgram] : []);
    };

    const clearSelections = () => {
        setSelectedYear({ start: 2016, end: 2022 });
        setSelectedProgram('');
        setSelectedPrograms([]);
    };

    

    return (
        <div className="sidebar">
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
                <label>
                    Program:
                    <select value={selectedProgram} onChange={handleProgramChange}>
                        <option value="">All Programs</option>
                        {programs.map(program => (
                            <option key={program} value={program}>
                                {program}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="apply-btn" onClick={applyFilter}>Apply Filters</button>
                <button className="clear-btn" onClick={clearSelections}>Clear Selections</button>
            </div>
        </div>
    );
};

export default Sidebar4;
