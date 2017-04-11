var express = require('express');
var router = express.Router();

// Lấy danh sách events 
var eventController = require('../../controllers/api/EventController');
router.route('/events').get(eventController.getEventForClient);

// Lấy danh sach locations
var locationController = require('../../controllers/api/LocationController');
router.route('/locations').get(locationController.getLocationForClient);

module.exports = router;