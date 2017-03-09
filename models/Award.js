var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var awardSchema = new Schema({
    supplier_id: String,
    name: String,
    image_url: String,
    describe: String,
    contact: String,
    more: String,
    item_id: String,
    tags: {
      type: [String],
      default: []
    }
});

var jwt = require('jsonwebtoken');
awardSchema.methods.generateJWT = function() {

};

var award = mongoose.model('award', awardSchema);
module.exports = award;
