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

itemSchema.methods.generateJWT = function() {

};

var items = mongoose.model('item', itemSchema);
module.exports = items;
