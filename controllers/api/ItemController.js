var Suppliers = require('../../models/Supplier');
var Items = require('../../models/Items');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  getAllOfSupplier: function(res,req,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var rx = RxMongo.find(Items, {
      "supplier_id": supplier_id
    });

    rx.subscribe(function(doc){
        EVResponse.success(res, doc);
    }, function(error) {
      EVResponse.failure(res,403, error);
    });
  },

  getDetail: function(req,res,next) {

    var item_id = req.params.item_id;
    var rx = RxMongo.findOne(Items,{
      "_id": item_id,
    }, false);

    rx.subscribe(function(doc){
      EVResponse.success(res,doc.getDetail());
    }, function(error) {
      EVResponse.failure(res,405,error);
    });
  },

  create: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }
    var ItemInfo = EVBody(req.body);
    ItemInfo.supplier_id = supplier_id;

    var newItem = new Items(ItemInfo);

    RxMongo.save(newItem).subscribe(function() {
      EVResponse.success(res,newItem);
    }, function(err) {
      EVResponse.failure(res,405, "Create Item failure");
    });
  },

  update: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
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
      EVResponse.failure(res,405, "Update Item failure");
    });
  },

  delete: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var Item_id = req.params.item_id;
    RxMongo.remove(Items, {
      '_id': Item_id,
      'supplier_id': supplier_id
    }).subscribe(function(){
      EVResponse.success(res,"Delete success");
    }, function(err){
      EVResponse.failure(res,405, "Delete Item failure");
    });
  }
};
