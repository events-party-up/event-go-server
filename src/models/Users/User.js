/**
 * Created by thanhqhc on 3/8/17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var LocationInfo = require('./../Events/LocationInfo.js');
var util = require('../../Utility/Utility')

function extend(obj, src) {
    util.extendObject(obj,src);
    return obj;
}

var userSchema = new Schema({
    name: String,
    nick_name: String,
    image_url: String,
    created_date: {
        type: Date,
        default: new Date()
    },
    provider_type: {
        type: String,
        required : true
    },
    provider_id: {
        type: String,
        unique: true,
        required : true
    },
    provider_access_token: String,
    age: Number,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    birthday: Date,
    address: String,
    level: {
        type: Number,
        default: 0
    },
    exp: {
        type: Number,
        default: 0
    },
    user_status: String,
    tags: {
      type: [String],
      default: []
    },
    device: {
      type: Object,
      default: {}
    },
    last_location_info: Object
});

var jwt = require('jsonwebtoken');

userSchema.methods.generateJWT = function() {

    // set expiration to 30 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        user_id: this._id,
        exp: parseInt(exp.getTime() / 1000),
    }, 'event-go-2017-hcmus-thanh-thai-@-k13');
};

userSchema.methods.signInResult = function (version) {

    return extend(this.infoResult(),{
        provider_type: this.provider_type,
        provider_id: this.provider_id,
        user_status: this.user_status,
        devices: this.devices,
        last_location_info: this.last_location_info,
        access_token: this.generateJWT()
    });
};

userSchema.methods.infoResult = function (version) {
    return {
        user_id: this._id,
        name: this.name,
        nick_name: this.nick_name,
        image_url: this.image_url,
        age: this.age,
        gender: this.gender,
        birthday: this.birthday,
        address: this.address,
        level: this.level,
        created_date: this.created_date,
        tags: this.tags,
    }
};

var UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
