var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var eventSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    name: String,
    sub_name: String,
    thumbnail_url: String,
    cover_url: String,
    policy_url: String,
    detail_url: String,
    start_time: Date,
    end_time: Date,
    created_date: {
        type: Date,
        default: new Date()
    },
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

eventSchema.methods.getInfo = function(ver) {
    return {
      event_id: this._id,
      supplier_id: this.supplier_id,
      name: this.name,
      sub_name: this.sub_name,
      thumbnail_url: this.thumbnail_url,
      cover_url: this.cover_url,
      policy_url: this.policy_url,
      detail_url: this.detail_url,
      start_time: this.start_time,
      end_time: this.end_time,
      created_date: this.created_date,
      location_info: this.location_info,
      status: this.status,
      tags: this.tags
    }
};

eventSchema.methods.getDetail = function(ver) {

  var tObject = this;
  tObject["event_id"] = tObject["_id"];
  delete tObject["_id"];
  delete tObject["_v"];

  return tObject;
};

eventSchema.methods.keyRequires = function(ver) {

  return [
    "supplier_id","name","sub_name",
     "thumbnail_url", "cover_url", "policy_url",
     "detail_url", "start_time", "end_time"
  ]
}

eventSchema.methods.checkKeyRequire = function(ver) {

  var require_keys = this.keyRequires(ver);
  require_keys.forEach(function(key) {
    if (this[key] === undefined) {
      return false;
    }
  });

  return true;
}

var eventModel = mongoose.model('event', eventSchema);
module.exports = eventModel;
