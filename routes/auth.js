const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Dummy user data for demonstration purposes
const users = [{ username: 'admin', password: bcrypt.hashSync('password', 10) }];

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.username = username;
    res.redirect('/dashboard');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
