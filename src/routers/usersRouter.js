const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const userController = require('../controller/users');

router
  .get('/', userController.user)
  .get('/profile', userController.profile)
  .get('/:id', userController.getselectUsers)
  .put('/profile/:id', upload, userController.updateImg)
  .put('/customer/:id', userController.updateCustInfo)
  .post('/register', userController.register)
  .post('/registerSeller', userController.registerSeller)
  .post('/login', userController.login)
  .post('/refreshToken', userController.refreshToken);

module.exports = router;
