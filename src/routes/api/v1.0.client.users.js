var express = require('express');
var router = express.Router();

// User Event
var userEventController = require("../../controllers/api/Users/UserEventController");
router.route('/events')
    .get(userEventController.getAll)

router.route('/events/:event_id/joinEvent')
    .post(userEventController.joinEvent);

router.route('/events/:event_id/outEvent')
    .post(userEventController.outEvent);

router.route('/events/:event_id/completeEvent')
    .post(userEventController.completeEvent);

// User Task
var userTaskController = require("../../controllers/api/Users/UserTaskController");
router.route('/events/:user_event_id/tasks')
    .get(userTaskController.getAll)

router.route('/events/:user_event_id/tasks/:task_id/joinTask')
    .post(userTaskController.joinTask);

router.route('/events/:user_event_id/tasks/:task_id/completeTask')
    .post(userTaskController.completeTask);

router.route('/events/:user_event_id/tasks/:task_id/outTask')
    .post(userTaskController.outTask)
    

// UserAward
var userAwardController = require("../../controllers/api/Users/UserAwardController");
router.route('/awards')
    .get(userAwardController.getAll)
    .post(userAwardController.post);
router.route('/awards/:user_award_id')
    .get(userAwardController.get)
    .put(userAwardController.put)
    .delete(userAwardController.delete);

// UserNotification
var userNotificationController = require("../../controllers/api/Users/UserNotification");
router.route('/notifications')
    .get(userNotificationController.getAll)
    .post(userNotificationController.post);
router.route('/notifications/:user_notification_id')
    .get(userNotificationController.get)
    .put(userNotificationController.put)
    .delete(userNotificationController.delete);

var userController = require("../../controllers/api/Users/UserController");
router.route('/images')
        .post(userController.uploadImage);

module.exports = router;