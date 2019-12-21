const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config')


module.exports = function() {
  const db = config.get('db');
  console.log(db);
  mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: false 
  })
  .then(() => winston.info(`Connected to ${db}..`))

mongoose.set('useCreateIndex', true)
}
