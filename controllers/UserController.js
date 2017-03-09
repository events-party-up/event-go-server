/**
 * Created by thanhqhc on 3/8/17.
 */

var Users = require('../models/User');
var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');
var jwt_decode = require('jwt-decode');
var EVResponse = require('./EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./RxMongo.js');
var EVBody = require('./EVBody.js');

 module.exports = {

   getAll : function(req, res, next) {

     var rx = RxMongo.find(Users);

     rx.subscribe(function(doc) {
       EVResponse.success(res, doc);
     }, function(error) {
       EVResponse.failure(res,403, error);
     });
   },

   get : function(req,res,next) {

     var rx = RxMongo.findOne(Users, {
       '_id': req.params.id
     });

     rx.subscribe(function(doc) {
       EVResponse.success(res, doc);
     }, function(error) {
       EVResponse.failure(res,403, error);
     });
   },

   createUser: function(req,res,next) {

     // kiem tra params in body
     var body = EVBody(req.body);

     // find user id exist ?
     var findUserExitsRx = RxMongo.findOne(Users, {
       '_id': body.id
     });

     findUserExitsRx.subscribe(function(doc) {
       EVResponse.success(res, doc);
     }, function(error) {
       EVResponse.failure(res,403, error);
     });

   },

   signIn: function(req,res,next) {

     var body = EVBody(req.body);

     // FB

     // Google
     
   }


 };
