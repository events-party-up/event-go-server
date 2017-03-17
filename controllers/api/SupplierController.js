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
     * @api {get} suppliers/ Read all supplier info
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

    /**
     * @api {get} suppliers/:event_id Get All User In Event
     * @apiParam {String} event_id want to get all user
     * @apiVersion 0.1.0
     * @apiName Get all user in event
     * @apiGroup Supplier
     * @apiPermission supplier or admin
     *
     * @apiDescription Lấy danh sách người chơi tham gia sự kiện
     *
     *
     * @apiExample Example usage:
     * GET /suppliers/events/abcde
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object} data              Result supplier info
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       code: 200,
     *       data: [
     *         event_id: "string",
     *         user_id: "string",
     *         start_time: Number,
     *         end_time: Number,
     *         status: "string",
     *         user_tasks: "[string]"
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
    getAllUserEvent: function(req,res,next) {

        // Step 1: Check supplier_id in access_token and get event_id in params
        // Step 2: Find Event with (event_id, supplier_id)
        // Step 3.1: True - get all UserEvent with event_id
        // Step 3.2: False - Callback result

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

    /**
     * @api {get} suppliers/:supplier_id Get supplier info
     * @apiParam {String} supplier_id want to get info
     * @apiVersion 0.1.0
     * @apiName Get Supplier info
     * @apiGroup Supplier
     * @apiPermission none
     *
     * @apiDescription Get supplier info
     *
     *
     * @apiExample Example usage:
     * GET /suppliers/abcde
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object} data                Result supplier info
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       code: 200,
     *       data: [
     *         supplier_id: "string",
     *         name: "string",
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

    /**
     * @api {post} suppliers/signin Sign in
     * @apiVersion 0.1.0
     * @apiName Supplier SignIn
     * @apiGroup Supplier
     * @apiPermission none
     *
     * @apiDescription Supplier SignIn
     *
     *
     * @apiExample Example usage:
     * Post /suppliers/signin
     *
     * @apiParamExample {json} Request-Example-InBody:
     * {
     *    username: "username",
     *    password: "password"
     * }
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object} data              List of Suppliers options (Array of Suppliers).
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       code: 200,
     *       data: [
     *         supplier_id: "string",
     *         name: "string",
     *         image_urL: "string",
     *         level: Number,
     *         company_info: {
     *           company_name: "string"
     *         },
     *         supplier_status: "string",
     *         tags: "[string]",
     *         username: "string",
     *         access_token: "string"
     *       ]
     *     }
     *
     *
     * @apiErrorExample User is not existed:
     *     HTTP/1.1 403 Not Authenticated
     *     {
     *       "code": 403
     *       "error": "supplier is not existed"
     *     }
     *     * @apiErrorExample User is not existed:
     *     HTTP/1.1 404 Not Authenticated
     *     {
     *       "code": 404
     *       "error": "Missing missing username or passoword key"
     *     }
     */
    signIn: function (req,res,next) {

        var body = EVBody(req.body);
        var username = body.username;
        var password = body.password;

        if (username == null || password == null) {
            EVResponse.failure(res,404,"Missing missing username or passoword key");
            return;
        }

        RxMongo.findOne(Suppliers,{
            'username': username,
            'password': password
        }, false). subscribe(function (doc) {

            EVResponse.success(res,doc.signInResult());
        }, function (error) {
            EVResponse.failure(res,403,"supplier is not existed");
        });
    },

    /**
     * @api {post} suppliers/signup Sign up
     * @apiVersion 0.1.0
     * @apiName Supplier SignUp
     * @apiGroup Supplier
     * @apiPermission admin
     *
     * @apiDescription Supplier SignUp
     *
     *
     * @apiExample Example usage:
     * Post /suppliers/signup
     *
     * @apiParamExample {json} Request-Example-InBody:
     * {
     *    admin: {
     *       username: "username",
     *       password: "password"
     *    }
     *    supplier: {
     *      username: "username",
     *      password: "password"
     *    }
     * }
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object} data                Result supplier info
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       code: 200,
     *       data: [
     *         supplier_id: "string",
     *         name: "string",
     *         image_urL: "string",
     *         level: Number,
     *         company_info: {
     *           company_name: "string"
     *         },
     *         supplier_status: "string",
     *         tags: "[string]",
     *         username: "string",
     *         access_token: "string"
     *       ]
     *     }
     *
     *
     * @apiErrorExample Supplier data empty:
     *     HTTP/1.1 406 Supplier data empty
     *     {
     *       "code": 406
     *       "error": "supplier data empty"
     *     }
     *     * @apiErrorExample username or password not availabe
     *     HTTP/1.1 407 UserName Or Password not available
     *     {
     *       "code": 407
     *       "error": "UserName Or Password not available"
     *     }
     *     * @apiErrorExample Authoried admin failure
     *     HTTP/1.1 408 Authoried admin fail
     *     {
     *       "code": 408
     *       "error": "Authoried admin fail"
     *     }
     *     * @apiErrorExample Create new supplier failure
     *     HTTP/1.1 409 Create new supplier failure
     *     {
     *       "code": 409
     *       "error": "Create new supplier failure"
     *     }
     */
    signUp: function(req,res,next) {

        var body = EVBody(req.body);
        var admin = body.admin;
        var supplierData = body.supplier;

        if (supplierData == null) {
            EVResponse.failure(res,406,"Supplier data empty");
            return;
        }

        var adminMess = EVResponse.authoriedAdmin(admin);
        if (admin != null) {
            EVResponse.failure(res,408,adminMess);
            return;
        }

        // check username vs password available
        var username = supplierData.username;
        var password = supplierData.password;

        if (username.length < 6 || password.length < 6) {
            EVResponse.failure(res,407,'username or password not availabe');
        }

        // create new password
        var newSupplier = new Suppliers(supplierData);
        RxMongo.save(newSupplier).subscribe(function () {
            EVResponse.success(res,newSupplier.signInResult());
        }, function (error) {
            EVResponse.failure(res,409,"Create new supplier failure");
        });
    },

    /**
     * @api {put} suppliers?access_token Update Supplier Info
     * @apiParam {string} supplier access_token require
     * @apiVersion 0.1.0
     * @apiName Update Supplier Info
     * @apiGroup Supplier
     * @apiPermission admin, supplier
     *
     * @apiDescription Supplier Update
     *
     *
     * @apiExample Example usage:
     * Put /suppliers?access_token=asdfsdf
     *
     * @apiParamExample {json} Request-Example-InBody:
     * {
     *    name: "{string}",
     *    company_info: {
     *        url: "asdasd"
     *    },
     *    ..... (more field in supplier)
     * }
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object} data                Result supplier info
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       code: 200,
     *       data: [
     *         supplier_id: "string",
     *         name: "string",
     *         image_urL: "string",
     *         level: Number,
     *         company_info: {
     *           company_name: "string"
     *         },
     *         supplier_status: "string",
     *         tags: "[string]",
     *         username: "string",
     *         access_token: "string"
     *       ]
     *     }
     *
     *
     * @apiErrorExample Missing access token:
     *     HTTP/1.1 401 Missing access token
     *     {
     *       "code": 401
     *       "error": "Missing access token"
     *     }
     *     * @apiErrorExample Update fail with error:
     *     HTTP/1.1 402 Update fail with error
     *     {
     *       "code": 402
     *       "error": "Update fail with error + error"
     *     }
     */
    update: function (req,res,next) {

        var body = EVBody(req.body);

        // Check access token
        var access_token = body.access_token;
        var adminMess = EVResponse.authoriedAdmin(body.admin);

        if ( access_token == null && adminMess != null) {
            EVResponse.failure(res,401,"Missing access token");
            return;
        }

        var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
        // Admin ver
        if (adminMess == null && body.supplier_id != null) {
            supplier_id = body.supplier_id;
        }
        if ( supplier_id == null) {

            EVResponse.failure(res,401,"Missing access token");
            return;
        }

        RxMongo.findOneAndUpdated(Suppliers,{'_id': supplier_id}, body).subscribe(function (doc) {
            EVResponse.success(res,doc.signInResult());
        }, function (error) {
            EVResponse.failure(res,402,"Update fail with error " + error);
        });
    },

    /**
     * @api {delete} suppliers/:suplier_id Delete supplier
     * @apiVersion 0.1.0
     * @apiName Delete supplier
     * @apiGroup Supplier
     * @apiPermission admin
     *
     * @apiDescription Supplier delete
     *
     *
     * @apiExample Example usage:
     * Delete /suppliers/asdasdas
     *
     * @apiParamExample {json} Request-Example-InBody:
     * {
     *      admin: {
     *       username: "username",
     *       password: "password"
     *      }
     * }
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object} data                Result supplier info
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       code: 200,
     *       data: "Success"
     *     }
     *
     *
     * @apiErrorExample Admin authoried failure:
     *     HTTP/1.1 401 Admin authoried failure
     *     {
     *       "code": 401
     *       "error": "Admin authoried failure"
     *     }
     *     * @apiErrorExample Failure Delete Supplier
     *     HTTP/1.1 402 Failure Delete Supplier
     *     {
     *       "code": 402
     *       "error": "Failure Delete Supplier"
     *     }
     */
    delete: function (req,res,next) {

        var body = EVBody(req.body);
        var admin = body.admin;

        var mess = EVResponse.authoriedAdmin(admin);
        if (mess != null) {
            EVResponse.failure(res,401,mess);
        }

        RxMongo.remove(Suppliers,{'_id': supplier_id_remove}).subscribe(function () {
            EVResponse.success(res,"Success");
        }, function (err) {
            EVResponse.failure(res,402,"Failure Delete Supplier");
        });

    },

};
