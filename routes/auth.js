const Joi = require('joi');
const _ = require ('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


  
  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    //check if user is not already registered
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password');

    const token = user.generateAuthtokoen();

    res.send(token);
  });

  function validate(req) {
   
    const schema = {
      email: Joi.string().min(5).max(200).required().email(),
      password: Joi.string().min(5).max(225).required()
      
    };
  
    return Joi.validate(req, schema);
  }

  
module.exports = router; 
