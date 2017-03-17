var Suppliers = require('../../models/Supplier');
var Events = require('../../models/Events/Event');
var Tasks = require('../../models/Tasks/Task');
// var TaskItems = require('../../models/Tasks/Task-Item');
// var TaskLocations = require('../../models/Task-Locations');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  getTask: function(req,res,next) {

    var task_id = req.params.task_id;
    // var event_id = req.params.event_id;

    var rx = RxMongo.findOne(Tasks,{
      "_id": task_id,
    }, false);

    rx.subscribe(function(doc){
      EVResponse.success(res, doc);
    }, function(err) {
      EVResponse.failure(res,403, err);
    });
  },

  postTask: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }
    var taskInfo = EVBody(req.body);
    taskInfo.supplier_id = supplier_id;

    var event_id = req.params.event_id;
    var newTasks = new Tasks(taskInfo);

    var updateTaskID_EventRx = RxMongo.findOneAndUpdated(Events, {
      '_id': event_id,
      'supplier_id': supplier_id
    }, {
      $push: {
        "tasks": [
          newTasks._id
        ]
      }
    });

    RxMongo.save(newTasks).subscribe(function() {
      updateTaskID_EventRx.subscribe(function(doc) {
        EVResponse.success(res,newTasks);
      }, function(err) {
          EVResponse.failure(res,405, "update event failure");
      })
    }, function(err) {
      EVResponse.failure(res,405, "Create task failure");
    });
  },

  updateTask: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var taskInfo = EVBody(req.body);
    var task_id = req.params.task_id;
    var event_id = req.params.event_id;

    RxMongo.findOneAndUpdated(Tasks, {
      '_id': task_id,
      'supplier_id': supplier_id
    }, taskInfo).subscribe(function(doc) {
      EVResponse.success(res,doc);
    }, function(error) {
        EVResponse.failure(res,405, "Update task failure");
    });
  },

  deleteTask: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var task_id = req.params.task_id;
    var event_id = req.params.event_id;

    var removeTaskID_EventRx = RxMongo.findOneAndUpdated(Events, {
      '_id': event_id,
      'supplier_id': supplier_id
    }, {
        $pull: { 'tasks': task_id }
    });

    RxMongo.remove(Tasks, {
      '_id': task_id,
      'supplier_id': supplier_id
    }, function() {
      removeTaskID_EventRx.subscribe(function(){
        EVResponse.success(res,"Delete success");
      }, function(err) {
        EVResponse.failure(res,405, "Delete task failure when removeTaskIds in event");
      })
    }, function(err) {
      EVResponse.failure(res,405, "Delete task failure");
    });

  },

  // POST: /events/:event_id/tasks/:task_id/joinTask?access_token=?



};
