import Papa from 'papaparse';

export const parseCSV = (filePath, callback) => {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      Papa.parse(data, {
        header: true,
        complete: (results) => {
          callback(results.data);
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        }
      });
    });
};
