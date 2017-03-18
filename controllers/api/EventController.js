var Suppliers = require('../../models/Supplier');
var Events = require('../../models/Events/Event');
var UserEvent = require('../../models/Users/User-Event');
var UserAward = require('../../models/Users/User-Award');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  /**
   * @api {get} events/:event_id GetDetail
   * @apiParam {string} event_id Event_ID want to get detail
   * @apiVersion 0.1.0
   * @apiName GetDetail
   * @apiGroup Events
   * @apiPermission none
   *
   * @apiDescription  Read event detail info
   *
   *
   * @apiExample Example usage:
   * GET /events/dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Event detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        event_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        sub_name: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        policy_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: "[string]",
     *        priority: Number,
     *        limit_user: Number,
     *        rule: Object,
     *        award_ids: [string],
     *        task_ids: [string],
     *        status: string
     *       }
     *     }
   *
   *
   * @apiErrorExample Get events failure:
   *     HTTP/1.1 403 Get events failure
   *     {
   *       code : 403
   *       error: "Get events failure"
  *     }
   */
  getDetail: function(req,res,next) {

    var event_id = req.params.event_id;
    var rx = RxMongo.findOne(Events,{
      "_id": event_id
    }, false);

    rx.subscribe(function(doc){

      EVResponse.success(res,doc.getDetail());
    }, function(error) {
      EVResponse.failure(res,405,error);
    });
  },

  /**
   * @api {post} events?access_token Create Event
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName CreateEvent
   * @apiGroup Events
   * @apiPermission supplier or admin
   *
   * @apiDescription  Create Event
   *
   * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *    "supplier_id": string,
     *    "name": string,
     *    "sub_name": string,
          "thumbnail_url": string,
          "cover_url": string
          "policy_url": string,
          "detail_url": string,
          "start_time": Number,
          "end_time": Number,
          .... More if have above params that is required for create
     * }
   *
   *
   * @apiExample Example usage:
   * POST /events
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Event detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        event_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        sub_name: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        policy_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: "[string]",
     *        priority: Number,
     *        limit_user: Number,
     *        rule: Object,
     *        award_ids: [string],
     *        task_ids: [string],
     *        status: string
     *       }
     *     }
   *
   *
   * @apiErrorExample Access token not true:
   *     HTTP/1.1 401 Access token not true
   *     {
   *       code : 401
   *       error: "Access token not true"
   *     }
   * @apiErrorExample Body empty:
   *     HTTP/1.1 402 Body empty
   *     {
   *       code : 402
   *       error: "Body empty"
   *     }
   * @apiErrorExample Body not adequate:
   *     HTTP/1.1 403 Body not adequate
   *     {
   *       code : 403
   *       error: "Body not adequate"
   *     }
   *  @apiErrorExample Save fail event:
   *     HTTP/1.1 404 Save fail event
   *     {
   *       code : 404
   *       error: "Save fail event
   *     }
   */
  createEvent: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var body = EVBody(req.body);
    if (body == null) {
      EVResponse.failure(res,402,"Body empty");
      return;
    }
    var newEvent = new Events(body);
    var passKey = newEvent.checkKeyRequire();

    if (!passKey) {
      EVResponse.failure(res,403,"Body not adequate");
      return;
    }

    RxMongo.save(newEvent).subscribe(function() {
          EVResponse.success(res, newEvent.getDetail());
        }, function(error) {
          EVResponse.failure(res,404,"Save fail event");
        }
    );
  },

  /**
   * @api {put} events/:event_id?access_token Update Event
   * @apiParam {string} event_id Event_ID want to update
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName UpdateEvent
   * @apiGroup Events
   * @apiPermission supplier or admin
   *
   * @apiDescription  Update Event
   *
   * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *    "supplier_id": string,
     *    "name": string,
     *    "sub_name": string,
          "thumbnail_url": string,
          "cover_url": string
          "policy_url": string,
          "detail_url": string,
          "start_time": Number,
          "end_time": Number,
          .... More if have above params that is required for create
     * }
   *
   *
   * @apiExample Example usage:
   * PUT /events/sdfdsafa
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Event detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        event_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        sub_name: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        policy_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: "[string]",
     *        priority: Number,
     *        limit_user: Number,
     *        rule: Object,
     *        award_ids: [string],
     *        task_ids: [string],
     *        status: string
     *       }
     *     }
   *
   *
   * @apiErrorExample Access token not true:
   *     HTTP/1.1 401 Access token not true
   *     {
   *       code : 401
   *       error: "Access token not true"
   *     }
   * @apiErrorExample Update fail:
   *     HTTP/1.1 402 Update fail
   *     {
   *       code : 402
   *       error: "Update fail with error"
   *     }
   */
  updateEvent: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var event_id = req.params.event_id;

    RxMongo.findOneAndUpdated(Events,{
      "_id": event_id,
      "supplier_id": supplier_id
    }).subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(error) {
      EVResponse.failure(res,402,"Update fail with error " + error);
    })
  },

  /**
   * @api {delete} events/:event_id?access_token Delete Event
   * @apiParam {string} event_id Event_ID want to Delete
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName DeleteEvent
   * @apiGroup Events
   * @apiPermission supplier or admin
   *
   * @apiDescription  Delete Event
   *
   *
   * @apiExample Example usage:
   * DELETE /events/sdfdsafa
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Message
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: "Success"
     *     }
   *
   *
   * @apiErrorExample Access token not true:
   *     HTTP/1.1 401 Access token not true
   *     {
   *       code : 401
   *       error: "Access token not true"
   *     }
   * @apiErrorExample Delete Event Failure:
   *     HTTP/1.1 402 Delete Event Failure
   *     {
   *       code : 402
   *       error: "Delete Event Failure"
   *     }
   */
  deleteEvent: function(req,res,next) {

    var event_id = req.params.event_id;
    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    RxMongo.remove(Events,{
      '_id': event_id,
      'supplier_id': supplier_id
    }).subscribe(function () {

      EVResponse.success(res,"Success");
    }, function (err) {
      EVResponse.failure(res,402,"Delete Event Failure");
    })
  },

};
