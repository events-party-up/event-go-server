
var userController = require("../../controllers/UserController.js");
var express = require('express');
var router = express.Router();

router.get('/users', userController.getAll);
router.route('/users/:id').get(userController.get);

module.exports = router;
