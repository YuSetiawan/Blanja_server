const express = require('express')
const router = express.Router()
const shippingAddressController= require('../controller/address')
const {protect} = require('../middlewares/auth')


router
  .get('/', shippingAddressController.getAllShippingAddress)
  .get('/:id', shippingAddressController.getShippingAddress)
  .post('/', shippingAddressController.insertShippingAddress)
  .put('/:id', shippingAddressController.updateShippingAddress)
  .delete('/:id', shippingAddressController.deleteShippingAddress)

module.exports = router