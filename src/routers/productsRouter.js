const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const productController = require('../controller/products');

router

  .get('/', productController.getAllProduct)
  .get('/:id', productController.getProduct)
  .post('/', upload, productController.insertProduct)
  .put('/:id', upload, productController.updateProduct)
  .delete('/:id', productController.deleteProduct);

module.exports = router;
