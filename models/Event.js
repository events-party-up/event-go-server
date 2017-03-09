var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var eventSchema = new Schema({
    supplier_id: String,
    name: String,
    sub_name: String,
    thumbnail_url: String,
    cover_url: String,
    policy_url: String,
    detail_url: String,
    start_time: Date,
    end_time: Date,
    tags: {
      type: [String],
      default: []
    },
    priority: Number,
    location_info: Object,
    limit_user: Number,
    rule: Object,
    award_ids: {
      type: [String],
      default: []
    },
    tasks: {
      type: [String],
      default: []
    },
    status: String
});

eventSchema.methods.generateJWT = function() {

};

var eventModel = mongoose.model('event', eventSchema);
module.exports = eventModel;
