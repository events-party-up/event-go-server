var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

var UserEvents = require('../../models/Users/User-Event');
var UserTasks = require('../../models/Users/User-Task');
var UserSubs = require('../../models/Users/User-Subscribe');
var UserNotis = require('../../models/Users/User-Notification');
var Users = require('../../models/Users/User');
var Notifications = require('../../models/Notifications');

var apn = require('../../configure/apn');

module.exports = {

  createNotification: function(req,res,next) {

      var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
      if (supplier_id == null) {
        EVResponse.failure(res,401,"Access token not true");
        return;
      }
      
       // Create new notification
      var data = req.body;
      console.log(data);
      var newNotification = new Notifications(data);
      newNotification.supplier_id = supplier_id;

      console.log("Call here");
      var rx = RxMongo.save(newNotification);
      EVResponse.sendData(rx,res);
  },

  pushNotificationSupplier: function(req,res,next) {

      var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
      if (supplier_id == null) {
        EVResponse.failure(res,401,"Access token not true");
        return;
      }

      var notification_id = req.params.notification_id;
      
      var pushNotificationAction = function(notifiaction) {
        var event_id = req.query.event_id;
        var task_id = req.query.task_id;

        var exec = null;
        if (event_id) {
          console.log("Push event_id = " + event_id);
          exec = UserEvents.find({
            'event_id': event_id
          }).populate('user_id','device')
          
        } else if (task_id) {
          console.log("Push task_id = " + task_id);
          exec = UserTasks.find({
            'task_id': task_id
          }).populate('user_id','device')
        } else {
          console.log("Push AllUser");
          exec = Users.find();
        }

        exec.exec(function(err,docs){
              if (err) {
                  console.error(err);
                  return;
              } 
            var deviceArray = [];
            docs.forEach(function(element) {
              var userInfo = element.user_id === undefined ? element : element.user_id;
              var device = userInfo.device;

              if (device !== undefined && device !== null) {
                if ( device.title !== null && device.title !== undefined &&
                    device.body !== null && device.body !== undefined 
                ) {
                    deviceArray.push(device);
                }
              }
            });
            deviceArray.forEach(function(device){
              var device_token = device.device_token === undefined ? "" : device.device_token;
              console.log("Push notification in device token - " + device_token)
              apn.applePush(device_token,device.title,device.body,1);
            })
        })
      };
      
      console.log(notification_id);
      Notifications.findById(notification_id,function(err,notification){
        if (notification) {
          EVResponse.success(res,notification);
          pushNotificationAction(notification);
        } else {
          EVResponse.failure(res,404,"Notification not found");
        }
        
      })
      // RxMongo.findOne(Notifications,{
      //   '_id': notification_id
      // }, function(notification){
      //   console.log(notification)
      //   EVResponse.success(res,notification);
      //   // pushNotificationAction(notification);
      // }, function(error){
      //   console.error(error);
      
      // });
  },

  /**
   * @api {post} notifications?access_token PushNotification
   * @apiParam {string} access_token Authorized access_token
   * @apiVersion 0.1.0
   * @apiName PushNotification
   * @apiGroup Notifications
   * @apiPermission supplier or admin
   *
   * @apiDescription  PushNotification
   *
   * @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *        supplier_id: string,
     *        title: string,
     *        body: string,
     *        image_url: string,
     *        time_start_push: string,
     *        time_end_push: string,
     *        max_push_per_user: string,
     *        max_user_push: Number,
     *        tags: [string]
     *        status: string,
     * }
   *
   *
   * @apiExample Example usage:
   * POST /notifications?access_token=asdsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Notification detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        notification_id: string,
     *        supplier_id: string,
     *        title: string,
     *        body: string,
     *        image_url: string,
     *        time_start_push: string,
     *        time_end_push: string,
     *        max_push_per_user: string,
     *        max_user_push: Number,
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
   * @apiErrorExample Can't push anything
   *     HTTP/1.1 402 Can't push anything
   *     {
   *       code : 402
   *       error: "Can't push anything"
   *     }
   * @apiErrorExample Can't push users
   *     HTTP/1.1 403 Can't push users
   *     {
   *       code : 403
   *       error: "Can't push users"
   *     }
   */
  pushNotification: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
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
      EVResponse.failure(res,402,"Can't push anything");
    }

    // Create new notification
    var data = body.data;
    var newNotification = new Notifications(data);
    newNotification.supplier_id = supplier_id;

    usersRX.subscribe(function(docs) {

      var users_id = docs.map(function(element) {
        return element[user_id_key];
      });

      // // Forearch user_id insert notifiaction
      // users_id.forEach(function (user_id) {
      //
      //   var newUserNotifi = new UserNotis({
      //     'supplier_id': supplier_id,
      //     'user_id': user_id,
      //     'title': body.title,
      //     'body': body.body,
      //     'image_url': body.image_url
      //   });
      //
      //   RxMongo.save(newUserNotifi).subscribe(function(doc) {
      //     //
      //   }, function (error) {
      //     //
      //   })
      // });

      RxMongo.save(newNotification).subscribe(function() {

        EVResponse.success(res, newNotification);
      }, function(err) {
        EVResponse.failure(res,403,"Can't push users" + err);
      });
    }, function(err) {
      EVResponse.failure(res,403,"Can't push users");
    });
  },

  /**
   * @api {get} notifications/:notification_id?access_token={} GetDetail
   * @apiParam {string} notification_id Notification_ID want to get detail
   * * @apiParam {string} access_token Access token of supplier want to get detail
   * @apiVersion 0.1.0
   * @apiName GetDetail
   * @apiGroup Notifications
   * @apiPermission none
   *
   * @apiDescription  Read notification detail info
   *
   *
   * @apiExample Example usage:
   * GET /notifications/dasdsadsad
   *
   * @apiSuccess {Number} code                Code Success
   * @apiSuccess {Object} data                Notification detail
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: [
     *        notification_id: string,
     *        supplier_id: string,
     *        title: string,
     *        body: string,
     *        image_url: string,
     *        time_start_push: string,
     *        time_end_push: string,
     *        max_push_per_user: string,
     *        max_user_push: Number,
     *        tags: [string]
     *        status: string,
     *       ]
     *     }
   *
   *  @apiErrorExample Access token not true
   *     HTTP/1.1 401 Access token not true
   *     {
   *       code : 401
   *       error: "Access token not true"
  *     }
   * @apiErrorExample Get notification failure:
   *     HTTP/1.1 402 Get notification failure
   *     {
   *       code : 402
   *       error: "Get notification failure"
  *     }
   */
  getNotification: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,401,"Access token not true");
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
