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
   * @apiExample Example usage:
   * GET /events/dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Event detail
   * 
   * @apiUse EventDetailSuccessExample
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
   * @apiUse EventPostPutParam
   * @apiExample Example usage:
   * 
   * POST /events
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Event detail
   * @apiUse EventDetailSuccessExample
   * @apiUse ErrorAuthorized
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
    newEvent.supplier_id = supplier_id;
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
   * @apiUse EventPostPutParam
   * 
   * @apiExample Example usage:
   * PUT /events/sdfdsafa
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Event detail
   * @apiUse EventDetailSuccessExample
   *
   * @apiUse ErrorAuthorized
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
    var event_body = EVBody(req.body);

    RxMongo.findOneAndUpdated(Events,{
      "_id": event_id,
      "supplier_id": supplier_id
    },event_body).subscribe(function(doc){
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
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: "Success"
     *     }
   *
   * @apiUse ErrorAuthorized
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

  /**
   * @api {get} events?supplier_id={} GetAllEventsOfSupplier
   * @apiParam {string} supplier_id Supplier_id want to get events
   * @apiVersion 0.1.0
   * @apiName GetAllEventsOfSupplier
   * @apiGroup Events
   * @apiPermission none
   *
   * @apiDescription  Read all event of supplier_id with basic infomation
   *
   * @apiExample Example usage:
   * GET /events?supplier_id=dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object[]} data              List of Events options (Array of Events).
   * 
   * @apiUse EventInfoSuccessExample
   *
   * @apiErrorExample Get events failure (example):
   *     HTTP/1.1 403 Get events failure
   *     {
   *       code : 403
   *       error: "Get events failure"
   *     }
   * @apiErrorExample Missing supplier id:
   *     HTTP/1.1 403 Missing supplier id
   *     {
   *       code : 404
   *       error: "Missing supplier id"
   *     }
   */
  getAllEventOfSupplier: function(req,res,next) {

      var supplier_id = req.query.supplier_id;
      if (supplier_id == null) {
        EVResponse.failure(res,404,"Missing supplier id");
        return;
      }

      var rx = RxMongo.find(Events, {
          "supplier_id": supplier_id
      });

      rx.subscribe(function(doc){
          if(doc) {
              doc = doc.map(function(element){
                  return element.getInfo();
              })
          }
          EVResponse.success(res, doc);
      }, function(error) {

          EVResponse.failure(res,403, error);
      });
  },

  /**
   * @api {get} client/events GetEventsForClient
   * @apiVersion 0.1.0
   * @apiName GetEventsForClient
   * @apiGroup ClientMobile
   * @apiPermission User Authorized
   *
   * @apiDescription  Read all event with basic infomation
   *
   * @apiExample Example usage:
   * GET /client/events
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object[]} data              List of Events options (Array of Events).
   * 
   * @apiUse EventInfoSuccessExample
   * 
   * @apiUse ErrorAuthorized
   * @apiErrorExample Get events failure (example):
   *     HTTP/1.1 403 Get events failure
   *     {
   *       code : 403
   *       error: "Get events failure"
   *     }
   * @apiErrorExample Missing supplier id:
   *     HTTP/1.1 403 Missing supplier id
   *     {
   *       code : 404
   *       error: "Missing supplier id"
   *     }
   */
  getEventForClient: function(req,res,next) {

    var user_id = EVResponse.verifiyAccessToken(req,'user_id');
    if (user_id === null) {
      EVResponse.failure(res,401,'Missing access token or not acceptable');
      return;
    }

    var params = req.query;

    // var eventRx = RxMongo.find(Events,{
    //   // 'status': {$in : [Events.readyForSale, Events.waitForStart]}
    // }).subscribe(function(docs){
    //   if(docs) {
    //       docs = docs.map(function(element){
    //           return element.getInfo();
    //       })
    //   }
    //   EVResponse.success(res, docs);  
    // }, function(error) {
    //   EVResponse.failure(res,403, 'Get event error');
    // });
    let rx = RxMongo.populateFind(Events,{
            // 'user_id': user_id
        },'supplier_id',"name image_url level")
    EVResponse.sendData(rx,res);
  }
};