var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var taskSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    name: String,
    decribe: String,
    thumbnail_url: String,
    cover_url: String,
    detail_url: String,
    start_time: Date,
    end_time: Date,
    created_date: {
        type: Date,
        default: new Date()
    },
    task_info: Object,
    award_ids: {
      type: [String],
      default: []
    },
    max_num_finish_task: Number,
    current_num_finish_task: Number,
    next_tasks: {
      type: [String],
      default: []
    },
    previous_tasks_require: {
      type: [String],
      default: []
    },
    status: String
});

taskSchema.methods.generateJWT = function() {

};

var taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;
