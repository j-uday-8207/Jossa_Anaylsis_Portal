import Papa from 'papaparse';

export const parseCSV = (callback) => {
  fetch('/final.csv')
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
    })
    .catch(error => {
      console.error('Error fetching CSV file:', error);
    });
};
