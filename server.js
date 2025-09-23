
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-domain.vercel.app'] 
    : 'http://localhost:3001'
}));

// Dummy data (replace with your actual data source)

// Route to handle POST requests from frontend
 // Middleware to parse JSON bodies

app.use(cors());



app.get('/api/choices', (req, res) => {
  res.sendFile('public/output.json', { root: __dirname });
});




app.post('/api/data', (req, res) => {
  // Receive data from the frontend
  const data = req.body;

  // Simply return the received data back to the frontend
  return res.json(data);
});

// Serve static files from the React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



