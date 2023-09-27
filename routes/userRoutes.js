const express = require('express');
const userController = require('./../controllers/userController')
// ------------ ROUTES -------------

const router = express.Router(); // -> this is also a middleware

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(userController.getUserByID).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
