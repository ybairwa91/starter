const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//Doesnot make sense as it doesnot follow rest architecture where url are not verb but simply names
//but we donot always adhered to it sometimes we are out of the box
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

//this are all rest following routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
