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
    status: {
      type: String,
      enum: ['Prepare for Submit', 'Waiting for Review', 'In Review','Rejected', 'Ready for Sale', 'Waiting For Start'],
      default: 'Prepare for Submit'
    },
});

eventSchema.statics.prepareForSubmit = 'Prepare for Submit';
eventSchema.statics.waitingForReview = 'Waiting for Review';
eventSchema.statics.inReview = 'In Review';
eventSchema.statics.rejected = 'Rejected';
eventSchema.statics.readyForSale = 'Ready for Sale';
eventSchema.statics.waitingForStart = 'Waiting For Start';

eventSchema.methods.generateJWT = function() {

};
/**
   * @apiDefine EventInfoSuccessExample
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       data: [
   *        event_id: "string",
   *        supplier_id: "string",
   *        name: "string",
   *        sub_name: "string",
   *        thumbnail_url: "string",
   *        cover_url: "string",
   *        policy_url: "string",
   *        detail_url: "string",
   *        start_time: Number,
   *        end_time: Number,
   *        created_date: Number,
   *        location_info: {Object Location},
   *        tags: "[string]"
   *       ]
   *     }
   * 
 */
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
/**
     * @apiDefine EventDetailSuccessExample
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       code: 200,
    *       data: {
    *        event_id: "string",
    *        supplier_id: "string",
    *        name: "string",
    *        sub_name: "string",
    *        thumbnail_url: "string",
    *        cover_url: "string",
    *        policy_url: "string",
    *        detail_url: "string",
    *        start_time: Number,
    *        end_time: Number,
    *        created_date: Number,
    *        location_info: {Object Location},
    *        tags: "[string]",
    *        priority: Number,
    *        limit_user: Number,
    *        rule: Object,
    *        award_ids: [string],
    *        task_ids: [string],
    *        status: string
    *       }
    *     }
   * 
 */
eventSchema.methods.getDetail = function(ver) {

  var tObject = this;
  tObject["event_id"] = tObject["_id"];
  delete tObject["_id"];
  delete tObject["_v"];

  return tObject;
};
/**
 * @apiDefine EventPostPutParam
 * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *    "supplier_id": string,
     *    "name": string,
     *    "sub_name": string,
          "thumbnail_url": string,
          "cover_url": string
          "policy_url": string,
          "detail_url": string,
          "start_time": Number,
          "end_time": Number,
          .... More if have above params that is required for create
     * }
 */

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
