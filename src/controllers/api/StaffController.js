var Suppliers = require('../../models/Supplier');
var Events = require('../../models/Events/Event');
var Locations = require('../../models/Location');
var Images = require('../../models/Images');
var Staff = require('../../models/Staff');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');
var util = require('util');
var base64 = require('node-base64-image');
var gcs = require('../../configure/gcs');
var LocationManager = require('./LocationController');
var ImageManager = require('./ImageController');

module.exports = {
    
    signIn(req,res,next) {
        var body = EVBody(req.body);
        var username = body.username;
        var password = body.password;

        if (username === null || password === null) {
            EVResponse.failure(res,404,"Missing missing username or passoword key");
            return;
        }

        if (typeof username !== "string" || typeof password !== "string") {
            EVResponse.failure(res,400,"Field not a string");
            return
        }        

        RxMongo.findOne(Staff,{
            'username': username,
            'password': password
        }, false). subscribe(function (doc) {
            var result = doc.signInResult();
            req.session.access_token = result.access_token;
            req.session.save();
            EVResponse.success(res,result);
        }, function (error) {
            EVResponse.failure(res,404,"staff is not existed");
        });
    },

    signOut: function(req,res,next) {
        
        delete req.session["access_token"];
        req.session.save();

        EVResponse.success(res,"Đăng xuất thành công");
    },

    getMe: function(req,res,next) {
        
      var staff = EVResponse.verifiyAccessToken(req,'staff_id');
      if (staff === null ) {
        EVResponse.failure(res,401,'Missing token key');
        return;
      }  

      staff = Staff.getDicData(staff);
      var rx = RxMongo.findOne(Staff, {
            '_id': staff.staff_id
        }, false);

        EVResponse.sendData(rx,res);
    },

    updateInfo: function(req,res,next) {
      var staff = EVResponse.verifiyAccessToken(req,'staff_id');
      if (staff === null ) {
        EVResponse.failure(res,401,'Missing token key');
        return;
      }  
      staff = Staff.getDicData(staff);
      var body = EVBody(req.body);
      var rx = RxMongo.findOneAndUpdated(Staff,{'_id':staff.staff_id},body)
      EVResponse.sendData(rx,res);
    },

    uploadImage(req,res,next) {
        
        var staff = EVResponse.verifiyAccessToken(req,"staff_id");
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        
        staff = Staff.getDicData(staff);
        if (req.body !== undefined && req.body !== null) {
            if (req.body.image_description !== undefined && req.body.image_description !== null) {
                req.body.image_description.staff_id = staff.staff_id;
            } else {
                req.body.image_description = {
                    'staff_id': staff.staff_id
                }
            }
        }
    
        req.next_authorized = {
            'supplier_id': staff.supplier_id
        }

        ImageManager.postImage(req,res,next);
    },

    deleteImage(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,"staff_id");
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        staff = Staff.getDicData(staff);
        req.next_authorized = {
            'supplier_id': staff.supplier_id
        }
        
        ImageManager.deleteImage(req,res,next);
    },

    createLocation(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,"staff_id");
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        staff = Staff.getDicData(staff);
        if (req.body !== undefined && req.body !== null) {
            req.body["staff_id"] = staff.staff_id;
        }
        req.next_authorized = {
            'supplier_id': staff.supplier_id
        }
        LocationManager.create(req,res,next)
    },

    deleteLocation(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,"staff_id");
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        staff = Staff.getDicData(staff);
        req.next_authorized = {
            'supplier_id': staff.supplier_id
        }
        LocationManager.delete(req,res,next)
    },

    getLocations(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,"staff_id");
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        staff = Staff.getDicData(staff);
        var rx = RxMongo.find(Locations, {
            "supplier_id": staff.supplier_id,
            "staff_id": staff.staff_id,
        });
        EVResponse.sendData(rx,res);
    },

    getImages(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,"staff_id");
        if (staff == null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        staff = Staff.getDicData(staff);
        var rx = RxMongo.find(Images, {
            "supplier_id": staff.supplier_id,
            "staff_id": staff.staff_id,
        });
        EVResponse.sendData(rx,res);
    },

}