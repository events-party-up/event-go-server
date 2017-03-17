/**
 * Created by thanhqhc on 3/15/17.
 */

var UserAward = require('../../../models/Users/User-Award');

var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');
var EVResponse = require('./../../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../../RxMongo.js');
var EVBody = require('./../../EVBody.js');


module.exports = {

    getAll: function (req,res,next) {

        var user_id = EVResponse.verifiyAccessToken(req,"user_id");
        if (user_id == null) {
            EVResponse.failure(res,403,"Missing access token or accesstoken not true");
            return;
        }

        RxMongo.find(UserAward,{
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
            EVResponse.failure(res,403,"Missing access token or accesstoken not true");
            return;
        }

        var id = req.params.id;
        RxMongo.findOne(UserAward,{
            '_id': id,
            'user_id': user_id
        }).subscribe(function (docs) {
            EVResponse.success(res,docs);
        }, function (err) {
            EVResponse(res,406,"Error fetch data");
        });
    },

    post: function (req,res,next) {

        var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
        if (supplier_id == null) {
            EVResponse.failure(res,403,"Missing access token or accesstoken not true");
            return;
        }

        var body = EVBody(req.body);
        var user_id = req.query.user_id;
        var newAward = new UserAward(body);
        newAward.user_id = user_id
        newAward.supplier_id = supplier_id;

        RxMongo.save(newAward).subscribe(function () {
            EVResponse.success(res,newAward);
        }, function (error) {
            EVResponse(res,406,"Error save data");
        })
    },

    put: function (req,res,next) {

    },

    delete: function (req,res,next) {


    }
};