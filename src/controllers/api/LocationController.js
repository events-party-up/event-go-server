var Suppliers = require('../../models/Supplier');
var Locations = require('../../models/Location');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  /**
   * @api {get} locations/:location_id GetDetail
   * @apiParam {string} location_id Location_ID want to get detail
   * @apiVersion 0.1.0
   * @apiName GetDetail
   * @apiGroup Locations
   * @apiPermission none
   *
   * @apiDescription  Read location detail info
   *
   *
   * @apiExample Example usage:
   * GET /locations/dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Location detail
   * 
   * @apiUse LocationInfoResponse
   *
   * @apiErrorExample Get locations failure:
   *     HTTP/1.1 402 Get locations failure
   *     {
   *       code : 402
   *       error: "Get locations failure"
   *     }
   */
  getDetail: function(req,res,next) {

    var location_id = req.params.location_id;
    var rx = RxMongo.findOne(Locations,{
      "_id": location_id,
    }, false);

    rx.subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(error) {
      EVResponse.failure(res,402,error);
    });
  },

  /**
   * @api {post} locations?access_token Create Location
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName CreateLocation
   * @apiGroup Locations
   * @apiPermission supplier or admin
   *
   * @apiDescription  Create Location
   *
   * @apiUse LocationInfoParams
   *
   * @apiExample Example usage:
   * POST /locations?access_token=asdsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Location detail
   * @apiUse LocationInfoResponse
   *
   * @apiUse ErrorAuthorized
   * 
   * @apiErrorExample Create location failure:
   *     HTTP/1.1 402 Create location failure
   *     {
   *       code : 402
   *       error: "Create location failure"
   *     }
   */
  create: function(req,res,next) {

    console.log("Call location");

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }
    var locationInfo = EVBody(req.body);
    locationInfo.supplier_id = supplier_id;
    var newItem = new Locations(locationInfo);
    console.log(newItem);

    var rx = RxMongo.save(newItem)
    EVResponse.sendData(rx,res);
  },

  /**
   * @api {put} locations/:location_id?access_token Update Location
   * @apiParam {string} location_id Location_ID want to update
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName UpdateLocation
   * @apiGroup Locations
   * @apiPermission supplier or admin
   *
   * @apiDescription  Update Location
   *
   * @apiUse LocationInfoParams
   *
   *
   * @apiExample Example usage:
   * PUT /locations/sdfdsafa?access_token=?
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Location detail
   * @apiUse LocationInfoResponse
   *
   * @apiUse ErrorAuthorized
   * @apiErrorExample Update fail:
   *     HTTP/1.1 402 Update fail
   *     {
   *       code : 402
   *       error: "Update fail with error"
   *     }
   */
  update: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var LocationInfo = EVBody(req.body);
    var location_id = req.params.location_id;

    RxMongo.findOneAndUpdated(Locations, {
      "_id": location_id,
      "supplier_id": supplier_id
    }, LocationInfo).subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(err){
      EVResponse.failure(res,402, "Update Item failure");
    });
  },

  /**
   * @api {delete} locations/:location_id?access_token Delete Location
   * @apiParam {string} location_id Location_ID want to Delete
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName DeleteLocation
   * @apiGroup Locations
   * @apiPermission supplier or admin
   *
   * @apiDescription  Delete Location
   *
   *
   * @apiExample Example usage:
   * DELETE /locations/sdfdsafa?access_token=asdfdsaf
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
   * @apiUse ErrorAuthorized
   * @apiErrorExample Delete Location Failure:
   *     HTTP/1.1 402 Delete Location Failure
   *     {
   *       code : 402
   *       error: "Delete Location Failure"
   *     }
   */
  delete: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var location_id = req.params.location_id;
    RxMongo.remove(Locations, {
      '_id': location_id,
      'supplier_id': supplier_id
    }).subscribe(function(){
      EVResponse.success(res,"Delete success");
    }, function(err){
      EVResponse.failure(res,402, "Delete Item failure");
    });
  },

  /**
   * @api {get} client/locations?current_location_lat={lat}&current_location_lng={lng} GetLocations
   * @apiParam {string} current_location_lat Latitude of client current location
   * @apiParam {string} current_location_lng Longitude of client current location
   * @apiVersion 0.1.0
   * @apiName GetLocations
   * @apiGroup ClientMobile
   * @apiPermission User Authorized
   *
   * @apiDescription  get locations near client
   *
   *
   * @apiExample Example usage:
   * GET /client/locations?current_location_lat=-123213&current_location_lng=12321312
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object[]} data                Location detail
   * 
   * @apiUse LocationInfoArrayResponse
   *
   * @apiUse ErrorAuthorized
   * @apiErrorExample Get locations failure:
   *     HTTP/1.1 402 Get locations failure
   *     {
   *       code : 402
   *       error: "Get locations failure"
   *     }
   */
  getLocationForClient: function(req,res,next) {

      var user_id = EVResponse.verifiyAccessToken(req,'user_id');
      if (user_id === null) {
        EVResponse.failure(res,401,'Missing access token or not acceptable');
        return;
      }

      var params = req.query;
      var current_location = params.current_location;

      // Search location in range
      var queryMongo = {
          'location_info': {
            $exists: true
          },
          'location_info.coordinate': {
            $exists: true
          },
          'location_info.coordinate.lat': {
            $exists: true
          },
          'location_info.coordinate.lng': {
            $exists: true
          },
      }
      RxMongo.find(Locations,queryMongo).subscribe(function(docs){
        EVResponse.success(res,docs);
      }, function(error){
        EVResponse.failure(res,403,'Load location error');
      });
  }

};