/**
 * Created by thanhqhc on 3/15/17.
 */

var UserEvent = require('../../../models/Users/User-Event');
var UserAward = require('../../../models/Users/User-Award');

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

        RxMongo.find(UserEvent,{
            'user_id': user_id
        }).subscribe(function (docs) {
            EVResponse.success(res,docs);
        }, function (err) {
            EVResponse(res,406,"Error fetch data");
        });
    },

    get: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,401,"Missing access token or accesstoken not true");
            return;
        }

        var id = req.params.id;
        RxMongo.findOne(UserEvent,{
            '_id': id,
            'user_id': user_id
        }).subscribe(function (docs) {
            EVResponse.success(res,docs);
        }, function (err) {
            EVResponse(res,406,"Error fetch data");
        });
    },

    // POST: /events/:event_id/joinEvent
    joinEvent: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {

            EVResponse.failure(res,401,"Missing access token");
            return;
        }

        var event_id = req.params.event_id;

        RxMongo.findOne(UserEvent,{
            'user_id': user_id,
            'event_id': event_id,
        })
        .subscribe(function(doc) {

            if (doc !== null) {
                EVResponse.failure(res,403,"Bạn đã không thể tham gia sự kiện này")
                return;
            }

            var newUserEvent = new UserEvent({
                'user_id': user_id,
                'event_id': event_id,
                'status': 'pending'
            });

            var rx = RxMongo.save(newUserEvent)
            EVResponse.sendData(rx,res)
        }, function(err){
            EVResponse.failure(res,403,"Error when join event")
        })
    },

    // POST: /events/:event_id/outEvent
    outEvent: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {

            EVResponse.failure(res,401,"Missing access token");
            return;
        }
        var event_id = req.params.event_id;

        RxMongo.findOneAndUpdated(UserEvent, {
            'user_id': user_id,
            'event_id': event_id,
            'status': 'pending'
        }, {
            'status': 'quited'
        }).subscribe(function (doc) {
            EVResponse.success(res,"Out success");
        }, function (error) {
            EVResponse.failure(res,403,"Out failure");
        });
    },

    // Step 1 : find User_event
    // Step 2 : get awards
    // step 3 : update awards to UserAward
    // Step 4 : Update state UserEvent
    // POST: /events/:event_id/completeEvent
    completeEvent: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {

            EVResponse.failure(res,401,"Missing access token");
            return;
        }

        var event_id = req.params.event_id;

        var findUserEventRx = RxMongo.findOneAndUpdated(UserEvent, {
            'user_id': user_id,
            'event_id': event_id,
            'status': 'pending'
        }, {
            'status': 'completed'
        });

        var awardIDsRx = function (user_event) {

            RxMongo.findOne(Events,{
                '_id': event_id
            }, false).subscribe(function (event) {

                var userAwards = [];
                var userAwardsRx = [];
                event.award_ids.forEach(function (award_id) {
                    var newUserAward = new UserAward({
                        'event_id': event_id,
                        'user_id': user_id,
                        'award_id': award_id,
                        'status': 'pending'
                    });
                    userAwards.push(newUserAward);
                    userAwardsRx.push(RxMongo.save(newUserAward));
                });

                if (userAwards.length == 0) {
                    EVResponse.success(res, {
                        'user_event': user_event,
                        'user_awards': []
                    })
                } else {
                    Rx.Observable.merge(userAwardsRx).subscribe(function () {
                        EVResponse.success(res, {
                            'user_event': user_event,
                            'user_awards': userAwards
                        });
                    }, function (error) {
                        EVResponse.failure(res,408, "Save userawards fail");
                    })
                }

            }, function (err) {
                EVResponse.failure(res,407, "Event not found");
            })
        };

        findUserEventRx.subscribe(function (user_event) {
            awardIDsRx(user_event);
        }, function (error) {
            EVResponse.failure(res,406,"complete failure");
        });
    }
};