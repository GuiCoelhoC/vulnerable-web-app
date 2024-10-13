const express = require('express');
const _ = require('lodash');
const apiRoutes = require('./routes/api');

console.log("Starting...");
const app = express();
const port = 8080;

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
  const message = _.join(['Hello', 'from', 'the', 'complex', 'web', 'app!'], ' ');
  res.render('index', { message, data: 'Data will load below' });
});

// API route for external data
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
