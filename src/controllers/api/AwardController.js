var Suppliers = require('../../models/Supplier');
var Awards = require('../../models/Award');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  /**
   * @api {get} /events/:event_id/awards/:award_id GetDetail
   * @apiParam {string} award_id Award_ID want to get detail
   * @apiVersion 0.1.0
   * @apiName GetDetail
   * @apiGroup Awards
   * @apiPermission none
   *
   * @apiDescription  Read award detail info
   *
   *
   * @apiExample Example usage:
   * GET /awards/dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Award detail
   * 
   * @apiUse AwardInfoResponse
   * 
   * @apiErrorExample Get award failure:
   *     HTTP/1.1 402 Get award failure
   *     {
   *       code : 402
   *       error: "Get award failure"
  *     }
   */
  getDetail: function(req,res,next) {

    var award_id = req.params.award_id;
    var rx = RxMongo.findOne(Awards,{
      "_id": award_id,
    }, false);

    rx.subscribe(function(doc){
      EVResponse.success(res,doc.getDetail());
    }, function(error) {
      EVResponse.failure(res,402,"Get award failure");
    });
  },

  getAllOfEvent: function(req,res,next) {
    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var event_id = req.params.event_id;

    RxMongo.find(Awards, {
      'event_id': event_id,
      'supplier_id': supplier_id
    }).subscribe(function(docs){
      EVResponse.success(res,docs);
    }, function(error){
      console.error(error);
      EVResponse.failure(res,408, "Load awards failure");
    })
  },

  getAllOfEventClient: function(req,res,next) {
    var user_id = EVResponse.verifiyAccessToken(req,"user_id");
    if (user_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var event_id = req.params.event_id;

    RxMongo.find(Awards, {
      'event_id': event_id,
    }).subscribe(function(docs){
      EVResponse.success(res,docs);
    }, function(error){
      console.error(error);
      EVResponse.failure(res,408, "Load awards failure");
    })
  },

  /**
   * @api {post} /events/:event_id/awards Create Award
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName CreateAward
   * @apiGroup Awards
   * @apiPermission supplier or admin
   *
   * @apiDescription  Create Award
   *
   * @apiUse AwardInfoParams
   *
   * @apiExample Example usage:
   * POST /awards?access_token=asdsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Award detail
   *
   * @apiUse AwardInfoResponse
   *
   * @apiUse ErrorAuthorized
   * @apiErrorExample Create award failure:
   *     HTTP/1.1 402 Create award failure
   *     {
   *       code : 402
   *       error: "Create award failure"
   *     }
   */
  createAward: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }
    var awardInfo = EVBody(req.body);
    var event_id = req.params.event_id;
    var newAward = new Awards(awardInfo);

    newAward.supplier_id = supplier_id;
    newAward.event_id = event_id;

    RxMongo.save(newAward).subscribe(function() {
      EVResponse.success(res,newAward);
    }, function(error) {
      console.error(error);
      EVResponse.failure(res,402, "Create award failure");
    });
  },

  /**
   * @api {put} /events/:event_id/awards/:award_id Update Award
   * @apiParam {string} award_id Award_ID want to update
   * * @apiParam {string} event_id Award_ID want to update
   * @apiVersion 0.1.0
   * @apiName UpdateAward
   * @apiGroup Awards
   * @apiPermission supplier or admin
   *
   * @apiDescription  Update Award
   *
   * @apiUse AwardInfoParams
   * @apiExample Example usage:
   * PUT /awards/sdfdsafa?access_token=?
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Award detail
   *
   * @apiUse AwardInfoResponse
   *
   * @apiUse ErrorAuthorized
   * @apiErrorExample Update fail:
   *     HTTP/1.1 402 Update fail
   *     {
   *       code : 402
   *       error: "Update fail with error"
   *     }
   */
  updateAward: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var awardInfo = EVBody(req.body);
    var award_id = req.params.award_id;
    var event_id = req.params.event_id;
    
    if (awardInfo.item_id === '') {
      awardInfo.item_id = null;
    }
    console.log(awardInfo);
    
    RxMongo.findOneAndUpdated(Awards, {
      "_id": award_id,
      "supplier_id": supplier_id,
      'event_id': event_id
    }, awardInfo).subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(err){
      console.error(err);
      EVResponse.failure(res,402, "Update award failure");
    });
  },

  /**
   * @api {delete} /events/:event_id/awards/:award_id?access_token Delete Award
   * @apiParam {string} award_id Award_ID want to Delete
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName DeleteAward
   * @apiGroup Awards
   * @apiPermission supplier or admin
   *
   * @apiDescription  Delete Award
   *
   *
   * @apiExample Example usage:
   * DELETE /awards/sdfdsafa?access_token=asdfdsaf
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
   * @apiUse ErrorAuthorized
   * @apiErrorExample Delete Award Failure:
   *     HTTP/1.1 402 Delete Award Failure
   *     {
   *       code : 402
   *       error: "Delete Award Failure"
   *     }
   */
  deleteAward: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var award_id = req.params.award_id;
    var event_id = req.params.event_id;

    RxMongo.remove(Awards, {
      '_id': award_id,
      'supplier_id': supplier_id,
      'event_id': event_id
    }).subscribe(function(){
      EVResponse.success(res,"Delete success");
    }, function(err){
      EVResponse.failure(res,402, "Delete award failure");
    });
  }
};
