
const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

// require the user model !!!!
const User       = require('../models/user-model');
const Actions   = require('../models/actions')
const Locations = require('../models/locations')
const moment = require('moment')
const axios = require('axios')


router.post('/upload', uploadCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
})

router.put('/profile/edit/:id', uploadCloud.single('image'), (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `User with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

router.get('/friends/:id', (req,res,next) => {
  User.findById(req.params.id).populate('friends').then(data => {
    res.json(data)
  }).catch(err => console.log(err))
})

router.put('/follow', (req,res,next) => {
  //add person to following
  let userID = req.body.userID
  let friendID = req.body.friendID
  User.findByIdAndUpdate(userID, {$push: {friends: friendID}})
  .then(data => {
    res.json(data)
  }).catch(err => console.log(err))
})

router.put('/unfollow', (req,res,next) => {
  //add person to following
  let userID = req.body.userID
  let friendID = req.body.friendID
  console.log("unfollow " + req.body)
  User.findByIdAndUpdate(userID, {$pull: {friends: friendID}})
  .then(data => {
    res.json(data)
  }).catch(err => console.log(err))
})

router.put('/completed', (req,res,next) => {
  console.log(req.ip)

  User.findById(req.body.userID).then(data => {
    //finds the user and does some time checks and updates user accordingly
    var now = moment().unix();
    let updateObj = {
      $push: {actions: req.body.actionID},
    }
    console.log('this is the start')
    if (data.lastDayCompleted === undefined) {
      console.log(' =>>>>>>>>>>> first time completing')
      updateObj.lastDayCompleted = moment().unix()
      updateObj.currentStreak = 1
    }
    else if ((now - data.lastDayCompleted) > 86400000 && (now - data.lastDayCompleted) < 172800000) {
      console.log(' =>>>>>>>>>>> completed more than a day ago')
      updateObj.lastDayCompleted = moment().unix()
      updateObj.actionsCompleted = data.actionsCompleted + 1
      updateObj.currentStreak = data.currentStreak +1
    }
    else if ((now - data.lastDayCompleted) > 172800000) {
      console.log(' =>>>>>>>>>>> completed more than 2 days ago')
      updateObj.currentStreak = 0
      updateObj.lastDayCompleted = moment().unix()
      updateObj.actionsCompleted = data.actionsCompleted + 1
    }
    else {
      console.log(' =>>>>>>>>>>> in between today and tomorrow')
      updateObj.actionsCompleted = data.actionsCompleted + 1
    }

    //update user for doing action
    User.findByIdAndUpdate(data._id, updateObj)
    .then(data => res.json(data))
    .catch(err => console.log(err))
  }).catch(err => console.log(err))

  Actions.findById(req.body.actionID).then(data => {
    //finds the action and updates the action accordingly
    let updateObj = {};
    updateObj.timesCompleted = data.timesCompleted + 1

    //actually updates the action
    Actions.findByIdAndUpdate(data._id, updateObj)
    .then()
    .catch(err => console.log(err))
  }).catch(err => console.log(err))

  // get ip address
  // 
  axios.get(`http://api.ipstack.com/${req.ip}?access_key=73c433d44b1edd11638377b796be6f74&format=1`)
  .then(data => {
    let latitude = data.data.latitude
    let longitude = data.data.longitude
    Locations.create({lat : latitude, long: longitude}).then(()=>{}).catch(err => next(err))
  }).catch(err => console.log(err))

})

router.get('/leaderboard', (req,res,next) => {
  User.find().sort({currentStreak: -1, actionsCompleted: -1}).then(data => {
    res.json(data)
  }).catch(err => console.log(err))
})

router.get('/profile/:id', (req,res,next) => {
  User.findById(req.params.id).then(data => { res.json(data)}).catch(err => console.log(err))
})



module.exports = router;