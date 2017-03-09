var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var itemSchema = new Schema({
    supplier_id: String,
    name: String,
    image_url: String,
    status: String,
    detail: String,
    tags: {
      type: [String],
      default: []
    }
});

itemSchema.methods.generateJWT = function() {

};

var items = mongoose.model('item', itemSchema);
module.exports = items;
