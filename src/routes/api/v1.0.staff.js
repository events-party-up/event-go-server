var express = require('express');
var router = express.Router();

var staffController = require('../../controllers/api/StaffController');

router.route('/me')
    .get(staffController.getMe)
    .put(staffController.updateInfo);

router.route('/locations')
    .get(staffController.getLocations)
    .post(staffController.createLocation);
router.route('/locations/:location_id')
    .delete(staffController.deleteLocation);

router.route('/images')
    .get(staffController.getImages)
    .post(staffController.uploadImage);
router.route('/images/:image_id')
    .delete(staffController.deleteImage)
    
router.route('/locations/:location_id')
    .delete(staffController.deleteImage);

router.route('/signin').post(staffController.signIn)
router.route('/signout').post(staffController.signOut)



module.exports = router