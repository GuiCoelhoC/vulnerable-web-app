const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const _ = require('lodash');


const app = express();
const port = 8080;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to check if user is logged in
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

// Routes
app.get('/', (req, res) => {
  const message = _.join(['Hello', 'from', 'the', 'complex', 'web', 'app!'], ' ');
  const data = "This is placeholder data."; // Provide a default value for data
  res.render('index', { message, data });
});


app.get('/dashboard', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/auth/login');
  }
  res.render('dashboard', { username: req.session.username });
});

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
