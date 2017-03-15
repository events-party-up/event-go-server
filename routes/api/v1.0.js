
var express = require('express');
var router = express.Router();

// Users
var userController = require("../../controllers/api/Users/UserController.js");
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
router.post('/events', eventController.createEvent);

router.route('/events/:event_id')
      .get(eventController.getDetail)
      .put(eventController.updateEvent)
      .delete(eventController.deleteEvent);

// User Event
var userEventController = require("../../controllers/api/Users/UserEventController");
router.route('/userevents')
    .get(userEventController.getAll)
    .post(userEventController.joinEvent);

router.route('/userevents/:user_event_id')
    .post(userEventController.completeEvent)
    .delete(userEventController.outEvent);


// Tasks
var taskController = require("../../controllers/api/TaskController");
router.route('/events/:event_id/tasks')
      .post(taskController.postTask);

router.route('/events/:event_id/tasks/:task_id')
      .get(taskController.getTask)
      .put(taskController.updateTask)
      .delete(taskController.deleteTask)

// User Task
var userTaskController = require("../../controllers/api/Users/UserTaskController");
router.route('/userevents/:user_event_id/tasks')
    .post(userTaskController.joinTask);

router.route('/userevents/:user_event_id/tasks/:user_task_id')
    .delete(userTaskController.outTask)
    .post(userTaskController.completeTask);


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
var pushNotification = require("../../controllers/api/PushNotificationController");
router.get('/notifications',pushNotification.getNotification);
router.post('/notifications', pushNotification.pushNotification);


// UserAward
var userAwardController = require("../../controllers/api/Users/UserAwardController");
router.route('/userawards')
    .get(userAwardController.getAll)
    .post(userAwardController.post);
router.route('/userawards/:user_award_id')
    .get(userAwardController.get)
    .put(userAwardController.put)
    .delete(userAwardController.delete);

// UserNotification
var userNotificationController = require("../../controllers/api/Users/UserNotification");
router.route('/usernotifications')
    .get(userNotificationController.getAll)
    .post(userNotificationController.post);
router.route('/usernotifications/:user_notification_id')
    .get(userNotificationController.get)
    .put(userNotificationController.put)
    .delete(userNotificationController.delete);


module.exports = router;
