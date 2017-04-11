/**
 * Created by thanhqhc on 3/15/17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var userAwardSchema = new Schema({
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'event'
    },
    task_id: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    award_id: {
        type: Schema.Types.ObjectId,
        ref: 'award'
    },
    supplier_id: {
        type: Schema.Types.ObjectId,
        ref: 'supplier'
    },
    create_time: {
        type: Date,
        default: new Date()
    },
    status: String
});

var userAwardModel = mongoose.model('user-award',userAwardSchema);
module.exports =  userAwardModel;
