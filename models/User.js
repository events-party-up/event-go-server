/**
 * Created by thanhqhc on 3/8/17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var LocationInfo = require('./LocationInfo.js');

var userSchema = new Schema({
    name: String,
    username: String,
    provider_type: String,
    provider_id: String,
    age: Number,
    sex: String,
    birthday: Number,
    address: String,
    level: Number,
    user_status: String,
    tag: {
      type: [String],
      default: []
    },
    devices: {
      type: [Object],
      default: []
    },
    last_location_info: Object
});

var jwt = require('jsonwebtoken');

userSchema.methods.generateJWT = function() {

    // set expiration to 30 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 30);

    return jwt.sign({
        user_id: this._id,
        exp: parseInt(exp.getTime() / 1000),
    }, 'event-go-2017-hcmus-thanh-thai-@-k13');
};

var UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
