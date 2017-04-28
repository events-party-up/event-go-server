var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var imageSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    staff_id: {
      type: Schema.Types.ObjectId,
      ref: 'staff'
    },
    name: String,
    detail: String,
    image_url: String,
    created_date: {
        type: Date,
        default: new Date()
    },
    tags: {
      type: [String],
      default: []
    },
    staff_id: {
      type: Schema.Types.ObjectId,
      ref: 'staff'
    },
});

var imageModel = mongoose.model('images', imageSchema);
module.exports = imageModel;

/**
 * @apiDefine ImagesInfoParams
 * @apiParamExample {json} Request-Example-InBody-Required:
   * {
   *       "file_encode_64": "base64 encode of image",
   *        "image_description": {
   *            name: string,
   *            detail: string,
   *            tags: [string]
   *        }
     * }
 */

/**
 * @apiDefine ImagesInfoResponse
 * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: [
     *        _id: string,
     *        supplier_id: string,
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        created_date: Number,
     *        tags: [string]
     *       ]
     *     }
   *
 */