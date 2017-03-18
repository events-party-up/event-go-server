var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var awardSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    name: String,
    image_url: String,
    detail: String,
    contact: String,
    more: String,
    item_id: String,
    created_date: {
        type: Date,
        default: new Date()
    },
    tags: {
      type: [String],
      default: []
    },
    status: String
});

var jwt = require('jsonwebtoken');
awardSchema.methods.generateJWT = function() {

};

var award = mongoose.model('award', awardSchema);
module.exports = award;
