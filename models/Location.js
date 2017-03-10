var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var locationSchema = new Schema({
    name: String,
    supplier_id: String,
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

locationSchema.methods.generateJWT = function() {

};

var locationModel = mongoose.model('location', locationSchema);
module.exports = locationModel;
