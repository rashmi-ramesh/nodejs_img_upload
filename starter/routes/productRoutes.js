const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts} = require('../controllers/productController');
const { uploadProductImage} = require('../controllers/uploadsController');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.post('/uploads', uploadProductImage);

module.exports = router;