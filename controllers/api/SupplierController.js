/**
 * Created by thanhqhc on 3/10/17.
 */

var Suppliers = require('../../models/Supplier');
var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');
var jwt_decode = require('jwt-decode');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

    getAll : function(req, res, next) {

        var rx = RxMongo.find(Suppliers);

        rx.subscribe(function(doc) {

            if (doc != null) {
                doc = doc.map(function (ele) {
                    return ele.signInResult();
                })
            }

            EVResponse.success(res, doc);
        }, function(error) {
            
            EVResponse.failure(res,403, error);
        });
    },

    get : function(req,res,next) {

        var rx = RxMongo.findOne(Suppliers, {
            '_id': req.params.id
        });

        rx.subscribe(function(doc) {
            EVResponse.success(res, doc);
        }, function(error) {
            EVResponse.failure(res,403, error);
        });
    },

    signIn: function (req,res,next) {

        var body = EVBody(req.body);
        var username = body.username;
        var password = body.password;

        if (username != null && password != null) {

            RxMongo.findOne(Suppliers,{
                'username': username,
                'password': password
            }, false). subscribe(function (doc) {

                EVResponse.success(res,doc.signInResult());
            }, function (error) {
                EVResponse.failure(res,403,error);
            })
        } else {
            EVResponse.failure(res,403,"Missing missing username + passoword key");
        }
    },

    signUp: function(req,res,next) {

        var body = EVBody(req.body);
        var admin = body.admin;
        var supplierData = body.supplier;

        if (supplierData == null) {
            EVResponse.failure(res,406,"Fail 77");
            return;
        }

        if (admin != null && admin.username != null && admin.password != null) {

            // check username vs password available
            var username = supplierData.username;
            var password = supplierData.password;

            if (username.length < 6 || password.length < 6) {
                EVResponse.failure(res,407,'username & password not availabe');
            }

            // create new password
            var newSupplier = new Suppliers(supplierData);
            RxMongo.save(newSupplier).subscribe(function () {
                EVResponse.success(res,newSupplier.signInResult());
            }, function (error) {
                EVResponse.failure(res,406,error);
            })

        } else {
            EVResponse.failure(res,406,"Fail 174");
        }

    },

    update: function (req,res,next) {

        var body = EVBody(req.body);

        // Check access token
        var access_token = body.access_token;
        if ( access_token == null) {
            EVResponse.failure(res,403,"Missing access token");
            return;
        }

        // CHeck user_id decode jwt
        var decode = jwt_decode(access_token);
        var user_id = decode.user_id;
        if ( user_id == null) {

            EVResponse.failure(res,403,"Missing access token");
            return;
        }

        RxMongo.findOneAndUpdated(Suppliers,{'_id': user_id}, body).subscribe(function (doc) {
            EVResponse.success(res,"Update success");
        }, function (error) {
            EVResponse.failure(res,403,"Update fail with error " + error);
        });

    },

    delete: function (req,res,next) {

        var body = EVBody(req.body);
        var admin = body.admin;
        var user_id_remove = req.params.id;

        if (user_id_remove == null) {
            EVResponse.failure(res,403,"Fail 155");
            return;
        }

        if (admin != null && admin.username != null && admin.password != null) {
            var configure = require('../../configure/configure');
            if (admin.username.localeCompare(configure.admin_username) == 0 &&
                admin.password.localeCompare(configure.admin_password) == 0)
            {
                RxMongo.remove(Suppliers,{'_id': user_id_remove}).subscribe(function () {

                    EVResponse.success(res,"Success");
                }, function (err) {
                    EVResponse.failure(res,403,"Failure");
                })
            } else {
                EVResponse.failure(res,406,"Fail 171");
            }
        } else {
            EVResponse.failure(res,406,"Fail 174");
        }

    }

};
