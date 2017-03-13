var Suppliers = require('../../models/Supplier');
var Locations = require('../../models/Location');

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

    var rx = RxMongo.find(Locations, {
      "supplier_id": supplier_id
    });

    rx.subscribe(function(doc){
        EVResponse.success(res, doc);
    }, function(error) {
      EVResponse.failure(res,403, error);
    });
  },

  getDetail: function(req,res,next) {

    var location_id = req.params.location_id;
    var rx = RxMongo.findOne(Locations,{
      "_id": location_id,
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
    var LocationInfo = EVBody(req.body);
    LocationInfo.supplier_id = supplier_id;

    var newItem = new Locations(LocationInfo);

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

    var LocationInfo = EVBody(req.body);
    var location_id = req.params.location_id;

    RxMongo.findOneAndUpdated(Locations, {
      "_id": location_id,
      "supplier_id": supplier_id
    }, LocationInfo).subscribe(function(doc){
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

    var location_id = req.params.location_id;
    RxMongo.remove(Locations, {
      '_id': location_id,
      'supplier_id': supplier_id
    }).subscribe(function(){
      EVResponse.success(res,"Delete success");
    }, function(err){
      EVResponse.failure(res,405, "Delete Item failure");
    });
  }
}
