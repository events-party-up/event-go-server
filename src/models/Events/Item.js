var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var itemSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    name: String,
    image_url: String,
    status: String,
    detail: String,
    created_date: {
        type: Date,
        default: new Date()
    },
    tags: {
      type: [String],
      default: []
    }
});

/**
 * @apiDefine ItemInfoParams
 * @apiParamExample {json} Request-Example-InBody-Required:
 * {
 *        name: string,
 *        detail: string,
 *        image_url: string,
 *        created_date: Number,
 *        tags: [string]
 *        status: string,
 * }
 */


/**
 * @apiDefine ItemInfoResponse
 * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OKßßß
   *     {
     *       code: 200,
     *       data: {
     *        item_id: string,
     *        supplier_id: string,
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        created_date: Number,
     *        tags: [string]
     *        status: string,
     *       }
     *     }
 */

itemSchema.methods.generateJWT = function() {

};

var items = mongoose.model('item', itemSchema);
module.exports = items;
