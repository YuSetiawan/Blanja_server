const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router
  .get('/', userController.user)
  .get('/profile', userController.profile)
  .get('/:id', userController.getselectUsers)
  .put('/profile/:id', userController.updateImg)
  .post('/register', userController.register)
  .post('/registerSeller', userController.registerSeller)
  .post('/login', userController.login)
  .post('/refreshToken', userController.refreshToken);

module.exports = router;
