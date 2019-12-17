const Joi = require('joi');
const mongoose = require('mongoose');




const taskSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: true,
    },
    status: {
        type: String,
        default:'todo',
        enum: ['todo', 'in progress', 'done'],
        required:true 
      },
    
    date: {
        type:Date,
        default: Date.now
    }, 
    user: {
      type: new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
          },
      }),
      required:true
     }
  });
  
  const Task = mongoose.model('Task', taskSchema);

  function validateTask(task) {
      const schema = {
          name: Joi.string().required(),
          status: Joi.string().required(),
          userId: Joi.objectId().required()
      };
      return Joi.validate(task, schema)
  };

  exports.Task = Task;
  exports.validate = validateTask;
  