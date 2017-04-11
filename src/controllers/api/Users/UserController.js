/**
 * Created by thanhqhc on 3/8/17.
 */

var Users = require('../../../models/Users/User');
var Events = require('../../../models/Events/Event');

var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');
var EVResponse = require('./../../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../../RxMongo.js');
var EVBody = require('./../../EVBody.js');

module.exports = {

    getAll : function(req, res, next) {

        var rx = RxMongo.find(Users);

        rx.subscribe(function(doc) {

            if (doc != null) {
                doc = doc.map(function (ele) {
                    return ele.infoResult();
                })
            }

            EVResponse.success(res, doc);
        }, function(error) {
            console.log('asdsadsa' + error);
            EVResponse.failure(res,403, error);
        });
    },

    get : function(req,res,next) {

        var id = req.params.id;
        if (id === 'events' || id === 'items' ||
            id === 'locations' || id === 'awards' ||
             id === 'notifications' || id === 'me' || id === 'signOut') {
              next();
              return;
        }

        var rx = RxMongo.findOne(Users, {
            '_id': req.params.id
        });

        rx.subscribe(function(doc) {
            EVResponse.success(res, doc);
        }, function(error) {
            EVResponse.failure(res,403, error);
        });
    },

    getMe: function(req,res,next) {
        
      var user_id = EVResponse.verifiyAccessToken(req,'user_id');
      if (user_id == null ) {
        EVResponse.failure(res,401,'Missing token key');
        return;
      }  
      var rx = RxMongo.findOne(Users, {
            '_id': user_id
        }, false);

        rx.subscribe(function(doc) {
            console.log(doc);
            EVResponse.success(res, doc.signInResult());
        }, function(error) {
            EVResponse.failure(res,403, "Load User detail failure");
        });
    },

    signIn: function(req,res,next) {

        // kiem tra params in body
        var body = EVBody(req.body);
        var access_token = body.provider_access_token;
        var provider_type = body.provider_type;

        if (access_token == null || access_token == undefined) {
            EVResponse.failure(res,401,"Missing access_token key");
            return;
        }

        if (provider_type == null || access_token == undefined) {
            EVResponse.failure(res,403,"Missing provider_type key");
            return;
        }
        var authRx = null;
        // Step 1: Check token key with provider
        if (provider_type.localeCompare("facebook") == 0) {

            authRx = require('../../../configure/FacebookAuth.js');
        } else if (body.provider_type.localeCompare("google") == 0) {

            authRx = require('../../../configure/GoogleAuth.js');
        } else {

            EVResponse.failure(res,403,"Unknown provider id");
        }

        // Step 2: Kiem tra user da ton tai chua
        delete body["access_token"];
        authRx(body, access_token).subscribe(function (profile) {

            RxMongo.findOne(Users, {
                'provider_id': profile.provider_id
            }).subscribe(function(doc) {

                var newUser = new Users(profile);

                // Nếu đã tồn tài thì update
                if (doc != null) {

                    RxMongo.findOneAndUpdated(Users, {
                        'provider_id': profile.provider_id
                    }, profile).subscribe(function (doc) {
                        var signInResult = doc.signInResult();

                        req.session.access_token = signInResult.access_token;
                        req.session.save();

                        EVResponse.success(res, signInResult);
                    }, function (error) {
                        EVResponse.failure(res,403, error)
                    });
                } // nguoc lai thi tao user moi
                else {

                    RxMongo.save(newUser).subscribe(function () {
                        var signInResult = newUser.signInResult();

                        req.session.access_token = signInResult.access_token;
                        req.session.save();

                        EVResponse.success(res, signInResult);
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

    },

    update: function (req,res,next) {

        var body = EVBody(req.body);

        var user_id = EVResponse.verifiyAccessToken(req,'user_id');
        if (user_id == null ) {
            EVResponse.failure(res,401,'Missing token key');
            return;
        }  

        RxMongo.findOneAndUpdated(Users,{'_id': user_id}, body).subscribe(function (doc) {
            EVResponse.success(res,"Update success");
        }, function (error) {
            EVResponse.failure(res,403,"Update fail with error " + error);
        });

    },

    delete: function (req,res,next) {

        var body = EVBody(req.body);
        var admin = body.admin;
        var user_id_remove = req.params.id;

        if (user_id_remove == null) {
            EVResponse.failure(res,403,"Fail 155");
            return;
        }

        if (admin != null && admin.username != null && admin.password != null) {
            var configure = require('../../../configure/configure');
            if (admin.username.localeCompare(configure.admin_username) == 0 &&
                admin.password.localeCompare(configure.admin_password) == 0)
            {
                RxMongo.remove(Users,{
                    '_id': user_id_remove
                }).subscribe(function () {

                    EVResponse.success(res,"Success");
                }, function (err) {
                    EVResponse.failure(res,403,"Failure");
                })
            } else {
                EVResponse.failure(res,406,"Fail 171");
            }
        } else {
            EVResponse.failure(res,406,"Fail 174");
        }

    },

    signOut: function(req,res,next) {
        delete req.session["access_token"];
        req.session.save();

        EVResponse.success(res,"Đăng xuất thành công");
    },
};
