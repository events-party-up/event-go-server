
var express = require('express');
var router = express.Router();

// Users
var userController = require("../../controllers/api/Users/UserController.js");
router.get('/users', userController.getAll);
router.get('/users/me', userController.getMe);
router.post('/users', userController.signIn);
router.post('/users/signOut', userController.signOut);
router.put('/users', userController.update);

router.route('/users/:id')
    .delete(userController.delete)
    .get(userController.get);

// Suppliers
var supplierController = require("../../controllers/api/SupplierController.js");

router.get('/suppliers', supplierController.getAll);
router.post('/suppliers/signUp', supplierController.signUp);
router.post('/suppliers/signIn', supplierController.signIn);
router.post('/suppliers/signOut', supplierController.signOut);
router.put('/suppliers', supplierController.update);

router.route('/suppliers/:supplier_id')
    .delete(supplierController.delete)
    .get(supplierController.get);

// Supplier
router.route('/suppliers/events/:event_id/users')
    .get(supplierController.getAllUserEvent);
router.get('/suppliers/events', supplierController.getEventAllOfSupplierRoleSupplier);
router.get('/suppliers/locations', supplierController.getLocationAllOfSupplier);
router.get('/suppliers/items', supplierController.getItemAllOfSupplier);
router.get('/suppliers/awards', supplierController.getAwardAllOfSupplier);
router.get('/suppliers/notifications', supplierController.getNotificationAllOfSupplier);
router.get('/suppliers/me', supplierController.getMe);

// Event
var eventController = require("../../controllers/api/EventController");
router.post('/events', eventController.createEvent);

router.route('/events/:event_id')
      .get(eventController.getDetail)
      .put(eventController.updateEvent)
      .delete(eventController.deleteEvent);

router.get('/events', eventController.getAllEventOfSupplier);

// Tasks
var taskController = require("../../controllers/api/TaskController");
router.route('/events/:event_id/tasks')
      .post(taskController.postTask);

router.route('/events/:event_id/tasks/:task_id')
      .get(taskController.getTask)
      .put(taskController.updateTask)
      .delete(taskController.deleteTask)

// Awards
var awardController = require("../../controllers/api/AwardController");
router.post('/awards', awardController.createAward);

router.route('/awards/:award_id')
      .get(awardController.getDetail)
      .put(awardController.updateAward)
      .delete(awardController.deleteAward)

// Locations
var locationController = require("../../controllers/api/LocationController");
router.post('/locations', locationController.create);

router.route('/locations/:location_id')
      .get(locationController.getDetail)
      .put(locationController.update)
      .delete(locationController.delete)

// Items
var itemController = require("../../controllers/api/ItemController");
router.post('/items', itemController.create);

router.route('/items/:item_id')
      .get(itemController.getDetail)
      .put(itemController.update)
      .delete(itemController.delete);

// Push notification
var pushNotification = require("../../controllers/api/PushNotificationController");
router.get('/notifications',pushNotification.getNotification);
router.post('/notifications', pushNotification.pushNotification);

module.exports = router;
