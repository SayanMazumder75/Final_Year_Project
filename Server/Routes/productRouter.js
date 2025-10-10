const express = require('express');
const router = express.Router();
const productCtrl = require('../Controllers/productCtrl');

// Define routes for product operations

router.route('/products')
.get(productCtrl.getProducts)
.post(productCtrl.createProduct)

router.route('/products/:id')
.put(productCtrl.updateProduct)
.delete(productCtrl.deleteProduct);

module.exports = router;