/**
 * Created by thanhqhc on 3/8/17.
 */

var Users = require('../../models/User');
var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');
var jwt_decode = require('jwt-decode');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

 module.exports = {

   getAll : function(req, res, next) {

     var rx = RxMongo.find(Users);

     rx.subscribe(function(doc) {

       if (doc != null) {
         doc = doc.map(function (ele) {
           return ele.infoResult();
         })
       }

       // EVResponse.success(res, doc);
     }, function(error) {
       console.log('asdsadsa' + error);
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

   signIn: function(req,res,next) {

     // kiem tra params in body
     var body = EVBody(req.body);
     var access_token = body.access_token;
     var provider_type = body.provider_type;

     if (access_token == null) {
       EVResponse.failure(res,403,"Missing access_token key");
       return;
     }

     if (provider_type == null) {
       EVResponse.failure(res,403,"Missing provider_type key");
       return;
     }

     var authRx = null;
     // Step 1: Check token key with provider
     if (provider_type.localeCompare("facebook") == 0) {

       authRx = require('../../configure/FacebookAuth.js');
     } else if (body.provider_type.localeCompare("google") == 0) {

       authRx = require('../../configure/GoogleAuth.js');
     } else {
       EVResponse.failure(res,403,"Unknown provider id");
     }

    // Step 2: Kiem tra user da ton tai chua
     authRx(access_token).subscribe(function (profile) {

       RxMongo.findOne(Users, {
         'provider_id': profile.provider_id
       }).subscribe(function(doc) {

         var newUser = new Users(profile);

         // Nếu đã tồn tài thì update
         if (doc != null) {

           RxMongo.findOneAndUpdated(Users, {
              'provider_id': profile.provider_id
           }, profile).subscribe(function (doc) {
             EVResponse.success(res, doc.signInResult());
           }, function (error) {
             EVResponse.failure(res,403, error)
           });
         } // nguoc lai thi tao user moi
         else {

           RxMongo.save(newUser).subscribe(function () {
             EVResponse.success(res, newUser.signInResult());
           }, function (error) {
             EVResponse.failure(res,403, error);
           });

         }
       }, function(error) {

         EVResponse.failure(res,403, error);
       });

     }, function (error) {

       EVResponse.failure(res,403,error);
     });

   }


 };