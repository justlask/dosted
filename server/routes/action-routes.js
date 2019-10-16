const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Actions = require('../models/actions');
const User    = require('../models/user-model')


//get all tasks
router.get('/', (req,res,next) => {
  Actions.find().then(response => {
    res.json(response)
  }).catch(err => {
    res.json(err)
  })
})


router.get('/random', (req,res,next) => {
  Actions.find().then(response => {
    let random = response[Math.floor(Math.random()*response.length)]
    res.json(random)
  }).catch(err => {
    res.json(err)
  })
})

//find Actions by ids
router.get('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }         

  Actions.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})


//create new Actions
router.post('/', (req, res, next)=>{
 
  Actions.create({
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


// PUT route => to update a specific Actions
router.put('/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Actions.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Actions with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


// delete Actions by id
router.delete('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Actions.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Actions with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})



// GET route => to retrieve a specific task
// router.get('/:ActionsId/tasks/:taskId', (req, res, next) => {
//   Task.findById(req.params.taskId)
//   .then(theTask =>{
//       res.json(theTask);
//   })
//   .catch( err =>{
//       res.json(err);
//   })
// });


module.exports = router;