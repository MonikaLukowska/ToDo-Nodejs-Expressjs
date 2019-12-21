const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config')


module.exports = function() {
  const db = config.get('db');
  mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => winston.info(`Connected to ${db}..`))
  .catch(err => {
    winston.info(`DB Connection Error: ${err.message}`)});
  }