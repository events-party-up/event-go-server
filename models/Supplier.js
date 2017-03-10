var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var supplierSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    company_info: Object,
    image_urL: String,
    level: {
        type: Number,
        default: 1
    },
    created_date: {
        type: Date,
        default: new Date()
    },
    status: String
});

var jwt = require('jsonwebtoken');
supplierSchema.methods.generateJWT = function() {

    // set expiration to 30 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 30);

    return jwt.sign({
        user_id: this._id,
        password: this.password,
        exp: parseInt(exp.getTime() / 1000),
    }, 'event-go-2017-hcmus-thanh-thai-@-k13-supplier');
};

supplierSchema.methods.signInResult = function (version) {

    return require('../Utility/Utility').extendObject(this.infoResult(),{
        username: this.username,
        access_token: this.generateJWT()
    });
};

supplierSchema.methods.infoResult = function (version) {
    return {
        user_id: this._id,
        name: this.name,
        image_url: this.image_url,
        level: this.level,
        company_info: this.company_info,
        supplier_status: this.supplier_status,
    }
};

var SupplierModel = mongoose.model('supplier', supplierSchema);
module.exports = SupplierModel;
