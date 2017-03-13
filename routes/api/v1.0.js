
var express = require('express');
var router = express.Router();

// Users
var userController = require("../../controllers/api/UserController.js");
router.get('/users', userController.getAll);
router.post('/users', userController.signIn);
router.put('/users', userController.update);

router.route('/users/:id')
    .delete(userController.delete)
    .get(userController.get);


// Supplier
var supplierController = require("../../controllers/api/SupplierController.js");
router.get('/suppliers', supplierController.getAll);
router.post('/suppliers/signUp', supplierController.signUp);
router.post('/suppliers/signIn', supplierController.signIn);
router.put('/suppliers', supplierController.update);

router.route('/suppliers/:id')
    .delete(supplierController.delete)
    .get(supplierController.get);

// Event
var eventController = require("../../controllers/api/EventController");
router.get('/events', eventController.getAllOfSupplier);
router.post('events', eventController.createEvent);

router.route('/events/:event_id')
      .get(eventController.getDetail);
      .put(eventController.updateEvent);
      .delete(eventController.deleteEvent);

// Tasks
var taskController = require("../../controllers/api/TaskController");
router.route('/events/:event_id/')
      .post(taskController.postTask);

router.route('/events/:event_id/:task_id')
      .get(taskController.getTask)
      .put(taskController.updateTask)
      .delete(taskController.deleteTask)

// Awards
var awardController = require("../../controllers/api/AwardController");
router.get('/awards', awardController.getAllOfSupplier);
router.post('/awards', awardController.createAward);

rotuer.route('/awards/:award_id')
      .get(awardController.getDetail)
      .put(awardController.updateAward)
      .delete(awardController.deleteAward)

// Locations
var locationController = require("../../controllers/api/LocationController");
router.get('/locations', locationController.getAllOfSupplier);
router.post('/locations', locationController.create);

rotuer.route('/locations/:location_id')
      .get(locationController.getDetail)
      .put(locationController.update)
      .delete(locationController.delete)

// Items
var itemController = require("../../controllers/api/ItemController");
router.get('/items', itemController.getAllOfSupplier);
router.post('/items', itemController.create);

rotuer.route('/locations/:item_id')
      .get(itemController.getDetail)
      .put(itemController.update)
      .delete(itemController.delete)

// Push notification
var pushNotification = require("../../controllers/PushNotificationController");
router.get('/notifications',pushNotification.getNotification);
router.post('/notifications', pushNotification.pushNotification);


module.exports = router;
