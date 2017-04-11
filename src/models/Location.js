var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var locationSchema = new Schema({
    name: String,
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    detail: String,
    address: String,
    image_url: String,
    created_date: {
        type: Date,
        default: new Date()
    },
    links: {
      type: [String],
      default: []
    },
    location_info: Object,
    status: String,
    tags: {
      type: [String],
      default: []
    }
});

/**
 * @apiDefine LocationInfoResponse
 * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        location_id: string,
     *        supplier_id: string,
     *        name: string,
     *        detail: string,
     *        address: string,
     *        link: [string],
     *        image_url: string,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: [string]
     *        status: string,
     *       }
     *     }
 */

/**
 * @apiDefine LocationInfoArrayResponse
 * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: [
      *        {
        *        location_id: string,
        *        supplier_id: string,
        *        name: string,
        *        detail: string,
        *        address: string,
        *        link: [string],
        *        image_url: string,
        *        created_date: Number,
        *        location_info: {Object Location},
        *        tags: [string]
        *        status: string,
      *       }, {
    *               }
     *      ]
     *   }
 */

/**
 * @apiDefine LocationInfoParams
 * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *        name: string,
     *        detail: string,
     *        address: string,
     *        link: [string],
     *        image_url: string,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: [string]
     *        status: string,
     * }
 */

var locationModel = mongoose.model('location', locationSchema);
module.exports = locationModel;