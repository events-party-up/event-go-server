
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



module.exports = router;
