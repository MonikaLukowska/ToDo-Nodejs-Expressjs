const winston = require('winston');
const mongoose = require('mongoose');


module.exports = function() {
mongoose.connect('ToDoList_db"', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
  })
  .then(() => winston.info('Connected to MongoDB...'))

mongoose.set('useCreateIndex', true)
}
