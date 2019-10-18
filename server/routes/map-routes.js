const express = require('express');
const router  = express.Router();
const Locations = require('../models/locations')
const axios = require('axios')

/* GET home page */
router.get('/', (req, res, next) => {
  Locations.find().then(data =>  res.json(data)).catch(err => console.log(err))
});

router.get('/getkey', (req,res,next) => {
  let key = process.env.GOOGLE_KEY
  console.log('this is my key' + key)
  res.json(key)
})

router.get('/userlocation', (req,res,next) => {

  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log(ip)

  axios.get(`http://api.ipstack.com/${ip}?access_key=73c433d44b1edd11638377b796be6f74&format=1`)
  .then(data => {
    let latitude = data.data.latitude
    let longitude = data.data.longitude

    if (latitude === null || longitude === null) {
      return
    }
    res.json(latitude, longitude)
  }).catch(err => console.log(err))
})

module.exports = router;