
const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

// require the user model !!!!
const User       = require('../models/user-model');
const Actions   = require('../models/actions')
const moment = require('moment')


// all are /user

// router.post('/image-upload', isLoggedIn, (req, res, next) => {
//  // console.log(req.files, '+++++++_', req.body)
//  console.log('++++', req.user)
//  uploadCloud.v2.uploader
//    .upload(req.body.imageSrc, {
//      resource_type: 'image',
//    })

router.put('/profile/edit/:id', uploadCloud.single('image'), (req, res, next)=>{
  console.log(req.body)
  console.log(req.file)

  let userObj = {}


  if (req.body.bio !== undefined) userObj.bio = req.body.bio

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
  
  

  // User.findByIdAndUpdate(req.params.id, userObj)
  //   .then(() => {
  //     res.json({ message: `User with ${req.params.id} is updated successfully.` });
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   })
})

// username: String,
//   bio: String,
//   password: String,
//   image: {type: String, default: 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg'},
//   actionsCompleted: {type: Number, default: 0},
//   currentStreak: {type: Number, default: 0},
//   lastDayCompleted: String,
//   friends: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
//   actions: [{type: Schema.Types.ObjectId, ref: 'Actions'}],
//   location: {
//     city: String,
//     state: String
//   },


router.get('/friends/:id', (req,res,next) => {
  console.log(req.body)
  User.findById(req.params.id).populate('friends').then(data => {
    console.log(data)
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



module.exports = router;