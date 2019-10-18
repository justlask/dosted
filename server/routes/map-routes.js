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

  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  axios.get(`http://api.ipstack.com/${ip}?access_key=73c433d44b1edd11638377b796be6f74&format=1`)
  .then(data => {
    let latitude = data.data.latitude
    let longitude = data.data.longitude

    if (latitude === null || longitude === null) {
      let data = {
        key: key,
        lat: 25.766719818115234,
        long: -80.19670867919922
      }
      res.json(data)
    }
    else {
      let data = {
        key: key,
        lat: latitude,
        long: longitude
      }
      res.json(data)
    }
  })
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