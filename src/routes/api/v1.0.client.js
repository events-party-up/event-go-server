var express = require('express');
var router = express.Router();

// Lấy danh sách events 
var eventController = require('../../controllers/api/EventController');
router.route('/events').get(eventController.getEventForClient);

// Lấy danh sách award của eventController
var awardController = require('../../controllers/api/AwardController');
router.route('/events/:event_id/awards').get(awardController.getAllOfEventClient);

var taskController = require('../../controllers/api/TaskController');
router.route('/events/:event_id/awards').get(taskController.getAllOfEvent);

// Lấy danh sach locations
var locationController = require('../../controllers/api/LocationController');
router.route('/locations').get(locationController.getLocationForClient);


module.exports = router;