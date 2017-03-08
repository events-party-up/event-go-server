/**
 * Created by thanhqhc on 3/8/17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var userModelSchema = new Schema({
    name: String,
    avatar_url: String,
    email: String,
    facebook_id: String,
    google_id: String,
    number_phone: String,
    device_token: { type: [String], default: [] },
});

var jwt = require('jsonwebtoken');

userModelSchema.methods.generateJWT = function() {

    // set expiration to 30 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 30);

    return jwt.sign({
        user_id: this._id,
        exp: parseInt(exp.getTime() / 1000),
    }, 'event-go-2017-hcmus-thanh-thai-@-k13');
};


var UserModel = mongoose.model('User', userModelSchema);

module.exports = UserModel;