
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




router.put('/completed', (req,res,next) => {
  console.log(req.body.userID)
  console.log(req.body.actionID)
  console.log(moment())
  console.log(moment().toArray())


})




module.exports = router;