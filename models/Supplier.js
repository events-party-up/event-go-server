var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var supplierSchema = new Schema({
    name: String,
    username: String,
    password: String,
    company_info: Object,
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

var SupplierModel = mongoose.model('supplier', supplierSchema);
module.exports = SupplierModel;
