var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var awardSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'event'
    },
    name: {
      type: String,
      default: "Tên phần thưởng của bạn"
    },
    image_url: String,
    detail: {
      type: String,
      default: "Chi tiết phần thưởng của bạn"
    },
    contact: String,
    item_id:  {
      type: Schema.Types.ObjectId,
      ref: 'item'
    },
    created_date: {
        type: Date,
        default: new Date()
    },
    award_type: {
      type: String,
      enum: ["item", "voucher"]
    },
    tags: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ["empty", "available","expried"],
      default: "available"
    }
});

/**
 * @apiDefine AwardInfoParams
 * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        more: string,
     *        contact: string,
     *        item_id: string,
     *        tags: [string]
     *        status: string,
     * }
 */

/**
 * @apiDefine AwardInfoResponse
 * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: [
     *        award_id: string,
     *        supplier_id: string,
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        more: string,
     *        contact: string,
     *        item_id: string,
     *        created_date: Number,
     *        tags: [string]
     *        status: string,
     *       ]
     *     }
   *
 */

var jwt = require('jsonwebtoken');
awardSchema.methods.generateJWT = function() {

};

var award = mongoose.model('award', awardSchema);
module.exports = award;
