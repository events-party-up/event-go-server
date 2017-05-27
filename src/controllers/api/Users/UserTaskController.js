/**
 * Created by thanhqhc on 3/15/17.
 */

var UserEvent = require('../../../models/Users/User-Event');
var UserTask = require('../../../models/Users/User-Task');
var UserNotification = require('../../../models/Users/User-Event');
var UserAward = require('../../../models/Users/User-Award');
var Tasks = require('../../../models/Tasks/Task');

var EVResponse = require('./../../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../../RxMongo.js');
var EVBody = require('./../../EVBody.js');


module.exports = {

    getAllInEvent: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token or accesstoken not true");
            return;
        }
        var user_event_id = req.params.user_event_id
        rx = RxMongo.find(UserTask,{
            'user_id': user_id,
            'user_event_id': user_event_id
        })
        EVResponse.sendData(rx,res);
    },

    getAll: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token or accesstoken not true");
            return;
        }
        rx = RxMongo.find(UserTask,{
            'user_id': user_id,
        })
        UserTask.find({
            'user_id': user_id
        }).populate('task_id','name sub_name description thumbnail_url cover_url task_info task_type start_time end_time created_date status')
        .populate('event_id', 'name sub_name description thumbnail_url')
        .populate('event_id.supplier_id', 'name image_url').exec(function(err,docs){
            if (err) {
                EVResponse.failure(res,404,"Get error");
                return;
            } 
          
            EVResponse.success(res,docs);
        })

        // EVResponse.sendData(rx,res);
    },

    get: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token or accesstoken not true");
            return;
        }

        var id = req.params.id;
        var rx = RxMongo.findOne(UserEvent,{
            '_id': id,
            'user_id': user_id
        })
        EVResponse.sendData(rx,res);
    },

    // STEP 1: Tìm UserEventId tương ưng xem có tồn tại nó trong đó k ?
    // STEP 2: Kiểm tra task có thuộc event k ?
    // POST /client/events/:user_event_id/:task_id/joinTask
    joinTask: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token");
            return;
        }

        var user_event_id = req.params.user_event_id;
        var task_id = req.params.task_id;

        var findUserEvent = RxMongo.findOne(UserEvent,{
            "_id": user_event_id,
            "user_id": user_id
        },false);
        
        var doingNext = function() {
            //Step 1
            findUserEvent.subscribe(function(doc) {
                // STEP 2
                RxMongo.findOne(Tasks, {
                    '_id': task_id,
                    'event_id': doc.event_id
                }).subscribe(function(doc){
                    var newUserTask = new UserTask({
                        'event_id': doc.event_id,
                        'user_event_id': user_event_id,
                        'user_id': user_id,
                        'task_id': task_id
                    })
                    EVResponse.sendData(RxMongo.save(newUserTask),res);
                }, function(error) {
                    EVResponse.failure(res,403,"Nhiệm vụ không thuộc sự kiện");
                });
            }, function(error){ 
                console.error(error);
                EVResponse.failure(res,403,"Bạn chưa tham gia sự kiện để nhận nhiệm vụ");
            });
        }

        RxMongo.findOne(UserTask,{
            'user_event_id': user_event_id,
            'user_id': user_id,
            'task_id': task_id
        }).subscribe(function(doc) {
            if (doc !== null) {
                if (doc.status === 'doing') {
                    EVResponse.failure(res,403,"Bạn thực hiện nhiệm vụ");
                } else if (doc.status === 'quited') {
                    EVResponse.failure(res,403,"Bạn đã rời khỏi nhiệm vụ");   
                } else {
                    EVResponse.failure(res,403,"Bạn đã hoàn thành niệm vụ");
                }
                return;
            }
            
            doingNext();
        },function(error){
            EVResponse.failure(res,403,"Có lỗi tìm kiếm nhiệm vụ sự kiện");
        })
    },

    // POST /client/events/:user_event_id/:task_id/outTask
    outTask: function (req,res,next) {
        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token");
            return;
        }

        var user_event_id = req.params.user_event_id;
        var task_id = req.params.task_id;
        var rx = RxMongo.findOneAndUpdated(UserTask,{
            'user_event_id': user_event_id,
            'task_id': task_id,
            'user_id': user_id
        },{
            'status': 'out'
        });

        EVResponse.sendData(rx,res);
    },

    // POST /client/events/:user_event_id/:task_id/completeTask
    completeTask: function (req,res,next) {
        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token");
            return;
        }

        var user_event_id = req.params.user_event_id;
        var task_id = req.params.task_id;
        var body = EVBody(req.body);
        body["status"] = 'complete';
        var rx = RxMongo.findOneAndUpdated(UserTask,{
            'user_event_id': user_event_id,
            'task_id': task_id,
            'user_id': user_id
        },body);

        EVResponse.sendData(rx,res);        
    }
};