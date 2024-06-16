import React, { useState } from 'react';
import './Sidebar2.css';

const Sidebar2 = ({ handleYearChange }) => {
  const [selectedYears, setSelectedYears] = useState([]);

  const toggleYear = (year) => {
    const newSelectedYears = selectedYears.includes(year)
      ? selectedYears.filter(y => y !== year)
      : [...selectedYears, year];

    setSelectedYears(newSelectedYears);
    handleYearChange(newSelectedYears);
  };

  return (
    <div className="sidebar2">
      <h3>Filters</h3>
      <div className="years">
        {[2022, 2021, 2020, 2019, 2018, 2017, 2016].map(year => (
          <div key={year}>
            <input
              type="checkbox"
              id={year}
              checked={selectedYears.includes(year)}
              onChange={() => toggleYear(year)}
            />
            <label htmlFor={year}>{year}</label>
          </div>
        ))}
      </div>
      <button className="apply-button" onClick={() => handleYearChange(selectedYears)}>Apply</button>
      <button className="clear-button" onClick={() => setSelectedYears([])}>Clear</button>
    </div>
  );
};

export default Sidebar2;
