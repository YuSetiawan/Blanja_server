const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router
  .get('/', userController.user)
  .post('/register', userController.register)
  .post('/registerSeller', userController.registerSeller)
  .post('/login', userController.login)
  .post('/refreshToken', userController.refreshToken)
  .get('/profile', userController.profile);

module.exports = router;
