// convertCsvToJson.js
const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile('./final.csv')
  .then((jsonObj) => {
    // Extract unique values for each column
    const uniqueValues = jsonObj.reduce((acc, cur) => {
      Object.keys(cur).forEach((key) => {
        if (!acc[key]) {
          acc[key] = new Set();
        }
        acc[key].add(cur[key]);
      });
      return acc;
    }, {});

    // Convert sets to arrays
    Object.keys(uniqueValues).forEach((key) => {
      uniqueValues[key] = Array.from(uniqueValues[key]);
    });

    fs.writeFileSync('./output.json', JSON.stringify(uniqueValues, null, 2));
  });
