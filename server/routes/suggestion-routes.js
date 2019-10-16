const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Suggestions = require('../models/suggestions');
const User    = require('../models/user-model')


//create new Suggestions
router.post('/new', (req, res, next)=>{
  console.log(req.body)
  Suggestions.create({
    title: req.body.title,
    creator: req.body.userID
  }) .then(response => {
    res.json({message: `your suggestion has been added for consideration to become a DOST!`})
    })
});


router.get('/all', (req,res,next) => {
  console.log(req.user)
  Suggestions.find().then(response => {
    res.json(response)
  }).catch(err => {
    res.json(err)
  })
})

//find Suggestions by ids
router.get('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }         

  Suggestions.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})




// PUT route => to update a specific Suggestions
router.put('/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Suggestions.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Suggestions with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


// delete Suggestions by id
router.delete('/delete/:id', (req, res, next)=>{
  console.log(req.params)
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Suggestions.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Suggestions with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})

module.exports = router;