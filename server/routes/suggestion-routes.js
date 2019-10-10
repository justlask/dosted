const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Suggestions = require('../models/suggestions');
const User    = require('../models/user-model')


//get all tasks
router.get('/', (req,res,next) => {
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


//create new Suggestions
router.post('/', (req, res, next)=>{
 
  Suggestions.create({
    title: req.body.title,
    description: req.body.description,
    tasks: [],
    creator: req.user._id
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});


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
router.delete('/:id', (req, res, next)=>{

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