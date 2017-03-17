/**
 * Created by thanhqhc on 3/15/17.
 */

var UserEvent = require('../../../models/Users/User-Event');
var UserNotification = require('../../../models/Users/User-Event');
var UserAward = require('../../../models/Users/User-Award');

var EVResponse = require('./../../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../../RxMongo.js');
var EVBody = require('./../../EVBody.js');


module.exports = {

    getAll: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,'id');
        if (user_id == null) {
            EVResponse.failure(res,403,"Missing access token or accesstoken not true");
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

        var user_id = EVResponse.verifiyAccessToken(req,'_id');
        if (user_id == null) {
            EVResponse.failure(res,403,"Missing access token or accesstoken not true");
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

    joinTask: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"_id");
        if (user_id == null) {

            EVResponse.failure(res,403,"Missing access token");
            return;
        }

        var event_id = req.params.event_id;
        var newUserEvent = new UserEvent({
            'user_id': user_id,
            'event_id': event_id,
            'status': 'pending'
        });


    },

    outTask: function (req,res,next) {

    },

    completeTask: function (req,res,next) {

    }
};