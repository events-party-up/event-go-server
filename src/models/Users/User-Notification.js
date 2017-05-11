/**
 * Created by thanhqhc on 3/15/17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var userNotificationSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    notification_id: {
        type: Schema.Types.ObjectId,
        ref: 'notification'
    },
    title: String,
    body: String,
    image_url: String,
    create_time: {
        type: Date,
        default: new Date()
    },
});

var userNotificationModel = mongoose.model('user-notification',userNotificationSchema);
module.exports =  userNotificationModel;
