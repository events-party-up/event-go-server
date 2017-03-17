var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var notificationSchema = new Schema({
  supplier_id: {
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  },
  pushed_users: {
    type: [String],
    default: []
  },
  created_date: {
    type: Date,
    default: new Date()
  },
  title: String,
  body: String,
  time_start_push: Date,
  time_end_push: Date,
  max_push_per_user: Number,
  max_user_push: Number,
  status: {
    type: String,
    enum: ['pending', 'pushing', 'done']
  },
  tags: {
    type: [String],
    default: [],
  }
});

var notificationModel = mongoose.model('notification',notificationSchema);
module.exports =  notificationModel;
