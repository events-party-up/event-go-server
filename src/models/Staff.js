var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var staffSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    name: String,
    username: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ["readonly","fullaccess"],
        default: "readonly"
    },
    password: String,
    image_urL: String,
    created_date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        enum: ['active','deactive'],
        default: 'active'
    }
});

var jwt = require('jsonwebtoken');
staffSchema.methods.generateJWT = function() {

    // set expiration to 30 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 30);

    return jwt.sign({
        staff_id: this._id+ "EVENTGO" + this.supplier_id,
        password: this.password,
        exp: parseInt(exp.getTime() / 1000)
    }, 'event-go-2017-hcmus-thanh-thai-@-k13-supplier');
};

/**
 * @apiDefine SupplierInfoParams
 */

/**
 * @apiDefine SupplierInfoResponse
 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       code: 200,
     *       data: [
     *          supplier_id: "string",
     *          name: "string",
     *         image_urL: "string",
     *         level: Number,
     *         company_info: {
     *           company_name: "string"
     *         },
     *         supplier_status: "string",
     *         tags: "[string]"
     *       ]
     *     }
     *
 */
staffSchema.methods.signInResult = function (version) {

    return require('../Utility/Utility').extendObject(this.infoResult(),{
        username: this.username,
        access_token: this.generateJWT()
    });
};

staffSchema.methods.infoResult = function (version) {
    return {
        staff_id: this._id,
        name: this.name,
        image_url: this.image_url,
        create_date: this.create_date
    }
};

staffSchema.statics.getDicData = function (staffToken) {
    var data = staffToken.split("EVENTGO");
    return {
        staff_id: data[0],
        supplier_id: data[1]
    }
};
var StaffModel = mongoose.model('supplier-staffs', staffSchema);
module.exports = StaffModel;
