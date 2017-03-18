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
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        task_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        decribe: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        task_info: {Object task},
     *        tags: "[string]",
     *        award_ids: [string],
     *        max_num_finish_task: Number,
     *        current_num_finish_task: Number,
     *        next_tasks: [string],
     *        previous_tasks_require: [string]
     *        status: string
     *       }
     *     }
   *
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
    }, function(err) {
      EVResponse.failure(res,402, "Get tasks failure");
    });
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
   * @apiParamExample {json} Request-Example-InBody-Required:
   * {

     *        supplier_id: "string",
     *        name: "string",
     *        decribe: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        task_info: {Object task},
     *        tags: "[string]",
     *        award_ids: [string],
     *        max_num_finish_task: Number,
     *        current_num_finish_task: Number,
     *        next_tasks: [string],
     *        previous_tasks_require: [string]
     * }
   *
   *
   * @apiExample Example usage:
   * POST /tasks
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Task detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        task_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        sub_name: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        policy_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: "[string]",
     *        priority: Number,
     *        limit_user: Number,
     *        rule: Object,
     *        award_ids: [string],
     *        task_ids: [string],
     *        status: string
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
    taskInfo.supplier_id = supplier_id;

    var event_id = req.params.event_id;
    var newTasks = new Tasks(taskInfo);

    var updateEventID_TaskRx = RxMongo.findOneAndUpdated(Events, {
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
      updateEventID_TaskRx.subscribe(function(doc) {
        EVResponse.success(res,newTasks);
      }, function(err) {
          EVResponse.failure(res,402, "update event failure");
      })
    }, function(err) {
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
   * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *     task_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        decribe: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        task_info: {Object task},
     *        tags: "[string]",
     *        award_ids: [string],
     *        max_num_finish_task: Number,
     *        current_num_finish_task: Number,
     *        next_tasks: [string],
     *        previous_tasks_require: [string]
     * }
   *
   *
   * @apiExample Example usage:
   * PUT /tasks/sdfdsafa?access_token=?
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Task detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        task_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        sub_name: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        policy_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: "[string]",
     *        priority: Number,
     *        limit_user: Number,
     *        rule: Object,
     *        award_ids: [string],
     *        task_ids: [string],
     *        status: string
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
      'supplier_id': supplier_id
    }, taskInfo).subscribe(function(doc) {
      EVResponse.success(res,doc);
    }, function(error) {
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
   * @apiErrorExample Access token not true:
   *     HTTP/1.1 401 Access token not true
   *     {
   *       code : 401
   *       error: "Access token not true"
   *     }
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
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var event_id = req.params.event_id;
    var task_id = req.params.task_id;

    var removeEventID_TaskRx = RxMongo.findOneAndUpdated(Events, {
      '_id': event_id,
      'supplier_id': supplier_id
    }, {
        $pull: { 'tasks': task_id }
    });

    RxMongo.remove(Tasks, {
      '_id': task_id,
      'supplier_id': supplier_id
    }, function() {
      removeEventID_TaskRx.subscribe(function(){
        EVResponse.success(res,"Delete success");
      }, function(err) {
        EVResponse.failure(res,402, "Delete task failure when removeTaskIds in event");
      })
    }, function(err) {
      EVResponse.failure(res,402, "Delete task failure");
    });

  }
  
};
