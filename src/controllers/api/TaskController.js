var Suppliers = require('../../models/Supplier');
var Tasks = require('../../models/Tasks/Task');
var Events = require('../../models/Events/Event');
// var TaskItems = require('../../models/Tasks/Task-Item');
// var TaskLocations = require('../../models/Task-Locations');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  /**
   * @api {get} tasks/:task_id GetDetail
   * @apiParam {string} task_id Task_ID want to get detail
   * @apiVersion 0.1.0
   * @apiName GetDetail
   * @apiGroup Tasks
   * @apiPermission none
   *
   * @apiDescription  Read task detail info
   *
   *
   * @apiExample Example usage:
   * GET /tasks/dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Task detail
   * @apiUse TaskInfoResponse
   *
   * @apiErrorExample Get tasks failure:
   *     HTTP/1.1 402 Get tasks failure
   *     {
   *       code : 402
   *       error: "Get tasks failure"
  *     }
   */
  getTask: function(req,res,next) {

    var task_id = req.params.task_id;

    var rx = RxMongo.findOne(Tasks,{
      "_id": task_id,
    }, false);

    rx.subscribe(function(doc){
      EVResponse.success(res, doc);
    }, function(error) {
      console.error(error);
      EVResponse.failure(res,402, "Get tasks failure");
    });
  },

  getAllOfEvent: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var event_id = req.params.event_id;

    RxMongo.find(Tasks, {
      'event_id': event_id,
      // 'supplier_id': supplier_id
    }).subscribe(function(docs){
      EVResponse.success(res,docs);
    }, function(error){
      console.error(error);
      EVResponse.failure(res,408, "Load tasks failure");
    })
  },

  /**
   * @api {post} tasks?access_token Create Task
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName CreateTask
   * @apiGroup Tasks
   * @apiPermission supplier or admin
   *
   * @apiDescription  Create Task
   *
   * @apiUse TaskInfoParams
   *
   * @apiExample Example usage:
   * POST /tasks
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Task detail
   *
   * @apiUse TaskInfoResponse
   *
   * @apiUse ErrorAuthorized
   * @apiErrorExample Create task failure:
   *     HTTP/1.1 402 Create task failure
   *     {
   *       code : 402
   *       error: "Create task failure"
   *     }
   */
  postTask: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }
    var taskInfo = EVBody(req.body);
    var event_id = req.params.event_id;
    var newTasks = new Tasks(taskInfo);

    newTasks.supplier_id = supplier_id;
    newTasks.event_id = event_id;

    RxMongo.save(newTasks).subscribe(function() {
      EVResponse.success(res,newTasks);
    }, function(error) {
      console.error(error);
      EVResponse.failure(res,402, "Create task failure");
    });
  },

  /**
   * @api {put} tasks/:task_id?access_token Update Task
   * @apiParam {string} task_id Task_ID want to update
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName UpdateTask
   * @apiGroup Tasks
   * @apiPermission supplier or admin
   *
   * @apiDescription  Update Task
   *
   * @apiUse TaskInfoParams
   *
   * @apiExample Example usage:
   * PUT /tasks/sdfdsafa?access_token=?
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Task detail
   * 
   * @apiUse TaskInfoResponse
   *
   * @apiUse ErrorAuthorized
   * @apiErrorExample Update fail:
   *     HTTP/1.1 402 Update fail
   *     {
   *       code : 402
   *       error: "Update fail with error"
   *     }
   */
  updateTask: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var taskInfo = EVBody(req.body);
    var event_id = req.params.event_id;
    var task_id = req.params.task_id;
    RxMongo.findOneAndUpdated(Tasks, {
      '_id': task_id,
      'supplier_id': supplier_id,
      'event_id': event_id
    }, taskInfo).subscribe(function(doc) {
      EVResponse.success(res,doc);
    }, function(error) {
        console.error(error);
        EVResponse.failure(res,402, "Update task failure");
    });
  },

  /**
   * @api {delete} tasks/:task_id?access_token Delete Task
   * @apiParam {string} task_id Task_ID want to Delete
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName DeleteTask
   * @apiGroup Tasks
   * @apiPermission supplier or admin
   *
   * @apiDescription  Delete Task
   *
   *
   * @apiExample Example usage:
   * DELETE /tasks/sdfdsafa?access_token=asdfdsaf
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
   * @apiErrorExample Delete Task Failure:
   *     HTTP/1.1 402 Delete Task Failure
   *     {
   *       code : 402
   *       error: "Delete Task Failure"
   *     }
   */
  deleteTask: function(req,res,next) {
    
    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
      return;
    }

    var event_id = req.params.event_id;
    var task_id = req.params.task_id;

    RxMongo.remove(Tasks, {
      '_id': task_id,
      'supplier_id': supplier_id,
      'event_id': event_id
    }).subscribe(function() {
      EVResponse.success(res,"Delete success");
    }, function(error) {
      console.error(error);
      EVResponse.failure(res,402, "Delete task failure");
    });
  }
  
};
