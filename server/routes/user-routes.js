
const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

// require the user model !!!!
const User       = require('../models/user-model');
const Actions   = require('../models/actions')
const moment = require('moment')


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

  User.findById(req.body.userID).then(data => {
    //finds the user and does some time checks and updates user accordingly
    var now = moment().unix();
    let updateObj = {
      $push: {actions: req.body.actionID},
      lastDayCompleted: moment().unix()
    };
    if (data.lastDayCompleted === undefined) updateObj.currentStreak = 1
    if ((now - data.lastDayCompleted) > 86400000 && (now - data.lastDayCompleted) < 172800000) updateObj.currentStreak = data.currentStreak +1
    if ((now - data.lastDayCompleted) > 172800000) updateObj.currentStreak = 0
    updateObj.actionsCompleted = data.actionsCompleted + 1

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
    .then(data => { res.json(data)})
    .catch(err => console.log(err))
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