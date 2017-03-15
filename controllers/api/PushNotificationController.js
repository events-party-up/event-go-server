var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

var UserEvents = require('../../models/Users/User-Event');
var UserTasks = require('../../models/Users/User-Task');
var UserSubs = require('../../models/Users/User-Subscribe');
var Users = require('../../models/Users/User-Subscribe');
var Notifications = require('../../models/Notifications');

module.exports = {

  pushNotification: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var body = EVBody(req.body);
    var user_id_key = "user_id";
    var usersRX = null;
    // Post for event_ids
    if (body.event_ids != null) {
      usersRX = RxMongo.find(UserEvents,{
        'supplier_id': supplier_id,
        'event_id': body.event_ids
      },{
        "user_id": 1,
        "_id": 0
      });
    } // Post for task_ids
     else if (body.task_ids != null) {
       usersRX = RxMongo.find(UserTasks,{
         'supplier_id': supplier_id,
         'task_id': body.task_ids
       },{
         "user_id": 1,
         "_id": 0
       });
    } // Post for all user-subscribe in supplier
    else if (body.user_subscribe != null) {
      usersRX = RxMongo.find(UserSubs,{
        'supplier_id': supplier_id
      },{
        "user_id": 1,
        "_id": 0
      });
    } else {
      EVResponse.failure(res,406,"Can't push anything");
    }

    var data = body.data;
    var newNotification = new Notifications(data);
    newNotification.supplier_id = supplier_id;

    usersRX.subscribe(function(docs) {
      docs.map(function(element) {
        return element[user_id_key];
      });
      newNotification.pushed_users = newNotification;
      RxMongo.save(newNotification).subscribe(function() {
        EVResponse.success(res, newNotification);
      }, function(err) {
        EVResponse.failure(res,407,"Can't push users" + err);
      });
    }, function(err) {
      EVResponse.failure(res,407,"Can't push users");
    });
  },

  getNotification: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    RxMongo.find({
      "supplier_id": supplier_id
    }).subscribe(function(docs){
      EVResponse.success(res,docs);
    }, function(err){
      EVResponse.failure(res,406,"Error load notifications");
    });

  }
};
