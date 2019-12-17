const  auth = require('../middleware/auth')
const {Task, validate} = require('../models/task')
const {User} = require('../models/user')
const express = require('express');
const router = express.Router();



router.get('/', auth, async (req, res) => {
    const tasks = await Task.find().sort('date');
    res.send(tasks);
});

router.post('/', auth, async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

const task = new Task({
    name:req.body.name,
    status: req.body.status,
    user: {
      _id: user._id,
      name: user.name
    }
        
})
await task.save();
res.send(task);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
    const task = await Task.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      status: req.body.status,
      user: {
        _id: user._id,
        name: user.name
      }
    }, { new: true });

    if(!task) return res.status(404).send('Task with the given ID was not found')
    
    res.send(task);
});

router.delete('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
  
    if (!task) return res.status(404).send('Task with the given ID was not found');
  
    res.send(task);
  });
  
  router.get('/:id', auth, async (req, res) => {
    const task = await Task.findById(req.params.id);
  
    if (!task) return res.status(404).send('Task with the given ID was not found');
  
    res.send(task);
  });
  
  module.exports = router; 