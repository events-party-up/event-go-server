var Suppliers = require('../../models/Supplier');
var Awards = require('../../models/Award');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  /**
   * @api {get} awards/:award_id GetDetail
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
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: [
     *        award_id: string,
     *        supplier_id: string,
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        more: string,
     *        contact: string,
     *        item_id: string,
     *        created_date: Number,
     *        tags: [string]
     *        status: string,
     *       ]
     *     }
   *
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

  /**
   * @api {post} awards?access_token Create Award
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName CreateAward
   * @apiGroup Awards
   * @apiPermission supplier or admin
   *
   * @apiDescription  Create Award
   *
   * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        more: string,
     *        contact: string,
     *        item_id: string,
     *        tags: [string]
     *        status: string,
     * }
   *
   *
   * @apiExample Example usage:
   * POST /awards?access_token=asdsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Award detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        award_id: string,
     *        supplier_id: string,
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        more: string,
     *        contact: string,
     *        item_id: string,
     *        created_date: Number,
     *        tags: [string]
     *        status: string,
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
    awardInfo.supplier_id = supplier_id;

    var newAward = new Awards(awardInfo);

    RxMongo.save(newAward).subscribe(function() {
      EVResponse.success(res,newAward);
    }, function(err) {
      EVResponse.failure(res,402, "Create award failure");
    });
  },

  /**
   * @api {put} awards/:award_id?access_token Update Award
   * @apiParam {string} award_id Award_ID want to update
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName UpdateAward
   * @apiGroup Awards
   * @apiPermission supplier or admin
   *
   * @apiDescription  Update Award
   *
   * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        more: string,
     *        contact: string,
     *        item_id: string,
     *        tags: [string]
     *        status: string,
     * }
   *
   *
   * @apiExample Example usage:
   * PUT /awards/sdfdsafa?access_token=?
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Award detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        award_id: string,
     *        supplier_id: string,
     *        name: string,
     *        detail: string,
     *        image_url: string,
     *        more: string,
     *        contact: string,
     *        item_id: string,
     *        created_date: Number,
     *        tags: [string]
     *        status: string,
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
  updateAward: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var awardInfo = EVBody(req.body);
    var award_id = req.params.award_id;

    RxMongo.findOneAndUpdated(Awards, {
      "_id": award_id,
      "supplier_id": supplier_id
    }, awardInfo).subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(err){
      EVResponse.failure(res,402, "Update award failure");
    });
  },

  /**
   * @api {delete} awards/:award_id?access_token Delete Award
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
   *
   * @apiErrorExample Access token not true:
   *     HTTP/1.1 401 Access token not true
   *     {
   *       code : 401
   *       error: "Access token not true"
   *     }
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
    RxMongo.remove(Awards, {
      '_id': award_id,
      'supplier_id': supplier_id
    }).subscribe(function(){
      EVResponse.success(res,"Delete success");
    }, function(err){
      EVResponse.failure(res,402, "Delete award failure");
    });
  }
};
