var Suppliers = require('../../models/Supplier');
var Items = require('../../models/Events/Item');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {
  
  /**
   * @api {get} items/:item_id GetDetail
   * @apiParam {string} item_id Item_ID want to get detail
   * @apiVersion 0.1.0
   * @apiName GetDetail
   * @apiGroup Items
   * @apiPermission none
   *
   * @apiDescription  Read item detail info
   *
   *
   * @apiExample Example usage:
   * GET /items/dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Item detail
   *
   * @apiUse ItemInfoResponse
   *
   * @apiErrorExample Get items failure:
   *     HTTP/1.1 402 Get items failure
   *     {
   *       code : 402
   *       error: "Get items failure"
  *     }
   */
  getDetail: function(req,res,next) {

    var item_id = req.params.item_id;
    var rx = RxMongo.findOne(Items,{
      "_id": item_id,
    }, false);

    rx.subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(error) {
      EVResponse.failure(res,402,error);
    });
  },

  /**
   * @api {post} items/ Create Item
   * @apiVersion 0.1.0
   * @apiName CreateItem
   * @apiGroup Items
   * @apiPermission supplier or admin
   *
   * @apiDescription  Create Item
   *
   * @apiUse ItemInfoParams
   *
   * @apiExample Example usage:
   * POST /items?access_token=asdsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Item detail
   *
   * @apiUse ItemInfoResponse
   *
   * @apiUse ErrorAuthorized
   * @apiErrorExample Create item failure:
   *     HTTP/1.1 402 Create item failure
   *     {
   *       code : 402
   *       error: "Create item failure"
   *     }
   */
  create: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }
    var ItemInfo = EVBody(req.body);
    ItemInfo.supplier_id = supplier_id;

    var newItem = new Items(ItemInfo);

    RxMongo.save(newItem).subscribe(function() {
      EVResponse.success(res,newItem);
    }, function(err) {
      EVResponse.failure(res,402, "Create Item failure");
    });
  },

  /**
   * @api {put} items/:item_id Update Item
   * @apiParam {string} item_id Item_ID want to update
   * @apiVersion 0.1.0
   * @apiName UpdateItem
   * @apiGroup Items
   * @apiPermission supplier or admin
   *
   * @apiDescription  Update Item
   *
   * @apiUse ItemInfoParams
   *
   * @apiExample Example usage:
   * PUT /items/sdfdsafa?access_token=?
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Item detail
   * 
   * @apiUse ItemInfoResponse
   * 
   * @apiUse ErrorAuthorized
   * 
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

    var ItemInfo = EVBody(req.body);
    var Item_id = req.params.item_id;

    RxMongo.findOneAndUpdated(Items, {
      "_id": Item_id,
      "supplier_id": supplier_id
    }, ItemInfo).subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(err){
      EVResponse.failure(res,402, "Update Item failure");
    });
  },

  /**
   * @api {delete} item/:item_id?access_token Delete Task
   * @apiParam {string} item_id Item_ID want to Delete
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName DeleteItem
   * @apiGroup Items
   * @apiPermission supplier or admin
   *
   * @apiDescription  Delete Item
   *
   *
   * @apiExample Example usage:
   * DELETE /items/sdfdsafa?access_token=asdfdsaf
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
   * @apiErrorExample Delete Item Failure:
   *     HTTP/1.1 402 Delete Item Failure
   *     {
   *       code : 402
   *       error: "Delete Item Failure"
   *     }
   */
  delete: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var Item_id = req.params.item_id;
    RxMongo.remove(Items, {
      '_id': Item_id,
      'supplier_id': supplier_id
    }).subscribe(function(){
      EVResponse.success(res,"Delete success");
    }, function(err){
      EVResponse.failure(res,402, "Delete Item failure");
    });
  }
};
