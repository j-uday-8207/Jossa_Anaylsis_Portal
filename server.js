
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001' // Allow requests from this origin
}));

// Dummy data (replace with your actual data source)

// Route to handle POST requests from frontend
 // Middleware to parse JSON bodies

app.use(cors());



app.get('/api/choices', (req, res) => {
  res.sendFile('src/output.json', { root: __dirname });
});




app.post('/api/data', (req, res) => {
  // Receive data from the frontend
  const data = req.body;

  // Simply return the received data back to the frontend
  return res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



