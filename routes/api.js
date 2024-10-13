const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/github', async (req, res) => {
  try {
    // Fetching data from GitHub's public API
    const response = await axios.get('https://api.github.com');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from GitHub API' });
  }
});

module.exports = router;
