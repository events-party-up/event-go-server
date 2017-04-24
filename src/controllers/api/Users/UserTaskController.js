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

    getAll: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token or accesstoken not true");
            return;
        }
        rx = RxMongo.find(UserEvent,{
            'user_id': user_id
        })
        EVResponse.sendData(rx,res);
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
                    EVResponse.failure(res,3,"Nhiệm vụ không thuộc sự kiện");
                });
            }, function(error){ 
                console.error(error);
                EVResponse.failure(res,5,"Bạn chưa tham gia sự kiện để nhận nhiệm vụ");
            });
        }

        RxMongo.findOne(UserTask,{
            'user_event_id': user_event_id,
            'user_id': user_id,
            'task_id': task_id
        },false).subscribe(function(doc){
            if (doc.status === 'doing') {
                EVResponse.failure(res,6,"Bạn thực hiện nhiệm vụ");
            } else if (doc.status === 'out') {
                EVResponse.failure(res,6,"Bạn đã rời khỏi nhiệm vụ");   
            } else {
                EVResponse.failure(res,6,"Bạn đã hoàn thành niệm vụ");
            }
        },function(error){
            doingNext();
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