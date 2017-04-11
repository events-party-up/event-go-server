var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var userTaskSchema = new Schema({
  task_id: {
    type: Schema.Types.ObjectId,
    ref: 'task'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  start_time: {
    type: Date,
    default: new Date()
  },
  end_time: Date,
  status: String,
  result: Object
});

var userTaskModel = mongoose.model('user-task',userTaskSchema);
module.exports =  userTaskModel;
