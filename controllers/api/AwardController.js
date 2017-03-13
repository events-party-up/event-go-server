var Suppliers = require('../../models/Supplier');
var Awards = require('../../models/Award');

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

    var rx = RxMongo.find(Awards, {
      "supplier_id": supplier_id
    });

    rx.subscribe(function(doc){
        EVResponse.success(res, doc);
    }, function(error) {
      EVResponse.failure(res,403, error);
    });
  },

  getDetail: function(req,res,next) {

    var award_id = req.params.award_id;
    var rx = RxMongo.findOne(Awards,{
      "_id": award_id,
    }, false);

    rx.subscribe(function(doc){
      EVResponse.success(res,doc.getDetail());
    }, function(error) {
      EVResponse.failure(res,405,error);
    });
  },

  createAward: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }
    var awardInfo = EVBody(req.body);
    awardInfo.supplier_id = supplier_id;

    var newAward = new Awards(awardInfo);

    RxMongo.save(newAward).subscribe(function() {
      EVResponse.success(res,newAward);
    }, function(err) {
      EVResponse.failure(res,405, "Create award failure");
    });
  },

  updateAward: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
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
      EVResponse.failure(res,405, "Update award failure");
    });
  },

  deleteAward: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var award_id = req.params.award_id;
    RxMongo.remove(Awards, {
      '_id': award_id,
      'supplier_id': supplier_id
    }).subscribe(function(){
      EVResponse.success(res,"Delete success");
    }, function(err){
      EVResponse.failure(res,405, "Delete award failure");
    });
  }
}
