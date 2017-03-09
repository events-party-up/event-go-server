
var userController = require("../../controllers/api/UserController.js");
var express = require('express');
var router = express.Router();

router.get('/users', userController.getAll);
router.route('/users/:id').get(userController.get);

router.post('/users', userController.signIn);

module.exports = router;
