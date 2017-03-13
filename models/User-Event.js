var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var userEventSchema = new Schema({
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'event'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  start_time: {
    type: Date,
    default: new Date()
  },
  end_time: Date,
  status: String,
  user_tasks: {
    type: [String],
    default: []
  }
});

var userEventModel = mongoose.model('user-event',userEventSchema);
module.exports =  userEventModel;
