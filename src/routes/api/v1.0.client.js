var express = require('express');
var router = express.Router();

// Lấy danh sách events 
var eventController = require('../../controllers/api/EventController');
router.route('/events').get(eventController.getEventForClient);

module.exports = router;