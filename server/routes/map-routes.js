const express = require('express');
const router  = express.Router();
const locations = require('../models/locations')

/* GET home page */
router.get('/', (req, res, next) => {
  res.json('sup')
});

module.exports = router;