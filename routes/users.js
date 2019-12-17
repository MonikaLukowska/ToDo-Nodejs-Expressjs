const auth = require('../middleware/auth');
const _ = require ('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();



router.get('/me', auth, async (req, res) => {
  //excluding password from response
    const user = await User.findById(req.user._id).select('-password')
    res.send(user);
  });
  
  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    //check if user is not already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('email already registered.');
  
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    _.pick(user, ['name', 'email'])

    const token = user.generateAuthtokoen();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));  
  });
  
module.exports = router; 
