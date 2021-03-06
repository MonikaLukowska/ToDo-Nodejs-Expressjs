const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      }
      
});

userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
  return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const complexityOptions = {
      min: 5,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 0,
      requirementCount: 4
  }

  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(200).required().email(),
    //password: Joi.string().min(5).max(200).required()
    password: new PasswordComplexity(complexityOptions)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;