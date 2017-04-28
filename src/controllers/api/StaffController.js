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
var ImageManager = require('./ImageManager');

module.exports = {
    
    createUser(req,res,next) {

    },

    signIn(req,res,next) {

    },

    uploadImage(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,["supplier_id","staff_id"]);
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }

        if (req.body !== undefined && req.body !== null) {
            if (req.body.image_description !== undefined && req.body.image_description !== null) {
                req.body.image_description.staff_id = staff.staff_id;
            } else {
                req.body.image_description = {
                    'staff_id': staff.staff_id
                }
            }
        }

        ImageManager.postImage(req,res,next);
    },

    deleteImage(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,["supplier_id","staff_id"]);
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        ImageManager.deleteImage(req,res,next);
    },

    createLocation(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,["supplier_id","staff_id"]);
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        if (req.body !== undefined && req.body !== null) {
            req.body.staff_id = staff.staff_id;
        }

        LocationManager.create(req,res,next)
    },

    deleteLocation(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,["supplier_id","staff_id"]);
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        LocationManager.deleteLocation(req,res,next)
    },

    getLocations(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,["supplier_id","staff_id"]);
        if (staff === null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }

        var rx = RxMongo.find(Locations, {
            "supplier_id": staff.supplier_id,
            "staff_id": staff.staff_id,
        });
        EVResponse.sendData(rx,res);
    },

    getImages(req,res,next) {
        var staff = EVResponse.verifiyAccessToken(req,["supplier_id","staff_id"]);
        if (staff == null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }

        var rx = RxMongo.find(Images, {
            "supplier_id": staff.supplier_id,
            "staff_id": staff.staff_id,
        });
        EVResponse.sendData(rx,res);
    },

}