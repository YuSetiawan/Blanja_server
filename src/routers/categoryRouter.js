const express = require('express');
const router = express.Router();
const {getAllCategory, getCategory, insertCategory, updateCategory, deleteCategory} = require('../controller/category');

router.get('/', getAllCategory).get('/:id', getCategory).post('/', insertCategory).put('/:id', updateCategory).delete('/:id', deleteCategory);

module.exports = router;
