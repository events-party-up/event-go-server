/**
 * Created by thanhqhc on 3/10/17.
 */

var Suppliers = require('../../models/Supplier');
var UserEvent = require('../../models/Users/User-Event');

var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');
var jwt_decode = require('jwt-decode');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

    /**
     * @api {get} /suppliers/ Read all supplier info
     * @apiVersion 0.1.0
     * @apiName GetAllSupplier
     * @apiGroup Supplier
     * @apiPermission none
     *
     * @apiDescription Lấy tất cả supplier hiện có với thông tin cơ bản
     *
     *
     * @apiExample Example usage:
     * GET /suppliers
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object[]} data              List of Suppliers options (Array of Suppliers).
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
     * @apiError NoAccessRight Only authenticated Admins can access the data.
     * @apiError UserNotFound   The <code>id</code> of the User was not found.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 401 Not Authenticated
     *     {
     *       "error": "NoAccessRight"
     *     }
     */
    getAll : function(req, res, next) {

        RxMongo.find(Suppliers, {}).subscribe(function (docs) {
            // Check admin
            var body = EVBody(req.body);
            var admin = body.admin;

            var mess = EVResponse.authoriedAdmin(admin);
            if (mess != null) {
                EVResponse.success(res,docs);
            } else {
                if (docs != null) {
                    docs = docs.map(function (ele) {
                        return ele.infoResult();
                    });
                }
                EVResponse.success(res,docs);
            }
        }, function (error) {
            EVResponse.failure(res,407,mess);
        });
    },

    // GET suppliers/events/:event_id?assess_token={}
    // Step 1: Check supplier_id in access_token and get event_id in params
    // Step 2: Find Event with (event_id, supplier_id)
    // Step 3.1: True - get all UserEvent with event_id
    // Step 3.2: False - Callback result
    getAllUserEvent: function(req,res,next) {

        // Step 1: Check supplier_id in access_token and get event_id in params
        var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
        if (supplier_id == null) {
            EVResponse.failure(res,405,"Access token not true");
            return;
        }

        var event_id = req.params.event_id;
        var getUserEventRx = RxMongo.find(UserEvent, {
            'event_id': event_id
        });

        // Step 2: Find Event with (event_id, supplier_id)
        RxMongo.findOne(Events, {
            "_id": event_id,
            "supplier_id": supplier_id
        }).subscribe(function (doc) {

            getUserEventRx.subscribe(function (docs) {
                // Step 3.1: True - get all UserEvent with event_id
                EVResponse.success(res,docs);
            }, function (error) {
                // Step 3.2: False - Callback result
                EVResponse.failure(res,406,"User Event not available");
            })
        }, function (error) {
            EVResponse.failure(res,406,"Event not available");
        });
    },

    // GET suppliers/:supplier_id
    get : function(req,res,next) {

        var rx = RxMongo.findOne(Suppliers, {
            '_id': req.params.id
        });

        rx.subscribe(function(doc) {
            EVResponse.success(res, doc.infoResult());
        }, function(error) {
            EVResponse.failure(res,403, error);
        });
    },

    // POST
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

    // POST
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

    // PUT
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

    // Delete
    delete: function (req,res,next) {

        var body = EVBody(req.body);
        var admin = body.admin;
        var user_id_remove = req.params.id;

        if (user_id_remove == null) {
            EVResponse.failure(res,403,"Fail 155");
            return;
        }

        var mess = EVResponse.authoriedAdmin(admin);
        if (mess != null) {
            EVResponse.failure(res,406,mess);
        }

        RxMongo.remove(Suppliers,{'_id': user_id_remove}).subscribe(function () {
            EVResponse.success(res,"Success");
        }, function (err) {
            EVResponse.failure(res,403,"Failure");
        });

    },

};
