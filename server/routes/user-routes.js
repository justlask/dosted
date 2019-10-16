
const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

// require the user model !!!!
const User       = require('../models/user-model');
const Actions   = require('../models/actions')
const moment = require('moment')


// all are /user

router.put('/profile/edit/:id', uploadCloud.single('photo'), (req, res, next)=>{
  console.log(req.file)
  console.log(req.body)
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  userObj = req.body
  if (req.file) { userObj.profilePic = req.file.url};

  User.findByIdAndUpdate(req.params.id, userObj)
    .then(() => {
      res.json({ message: `User with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
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



router.put('/completed', (req,res,next) => {

  User.findById(req.body.userID).then(data => {
    //finds the user and does some time checks and updates user accordingly
    var now = moment().unix();
    let updateObj = {
      $push: {actions: req.body.actionID}
    };
    (data.lastDayCompleted === undefined) ? updateObj.lastDayCompleted = moment().unix() : updateObj.lastDayCompleted = moment().unix();
    (((now - data.lastDayCompleted) <= 86400000) || data.lastDayCompleted === undefined) ? updateObj.currentStreak = data.currentStreak + 1 : updateObj.currentStreak = 0
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




module.exports = router;