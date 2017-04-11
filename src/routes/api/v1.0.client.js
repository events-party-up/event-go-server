var express = require('express');

module.exports = function(router) {
    var clientRouter = router.route('/client');

    // Lấy danh sách events 
    var eventController = require('../../controllers/api/EventController');
    clientRouter.route('/events').get(eventController.getEventForClient);

    var userRouter = clientRouter.route('/users');
    // User Event
    var userEventController = require("../../controllers/api/Users/UserEventController");
    userRouter.route('/events')
        .get(userEventController.getAll)
        .post(userEventController.joinEvent);

    userRouter.route('/events/:user_event_id')
        .post(userEventController.completeEvent)
        .delete(userEventController.outEvent);

     // User Task
    var userTaskController = require("../../controllers/api/Users/UserTaskController");
    userRouter.route('/events/:user_event_id/tasks')
        .post(userTaskController.joinTask);

    userRouter.route('/events/:user_event_id/tasks/:user_task_id')
        .delete(userTaskController.outTask)
        .post(userTaskController.completeTask);

    // UserAward
    var userAwardController = require("../../controllers/api/Users/UserAwardController");
    userRouter.route('/awards')
        .get(userAwardController.getAll)
        .post(userAwardController.post);
    userRouter.route('/awards/:user_award_id')
        .get(userAwardController.get)
        .put(userAwardController.put)
        .delete(userAwardController.delete);

    // UserNotification
    var userNotificationController = require("../../controllers/api/Users/UserNotification");
    userRouter.route('/notifications')
        .get(userNotificationController.getAll)
        .post(userNotificationController.post);
    userRouter.route('/notifications/:user_notification_id')
        .get(userNotificationController.get)
        .put(userNotificationController.put)
        .delete(userNotificationController.delete);

};