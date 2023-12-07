'use strict';

const express = require('express');
const productController = require('../controllers/productController');
const router = new express.Router();

// const middleware1 = (req, res, next) => {
//   console.log('Hello from middleware 1');
//   next();
// };
// const middleware2 = (req, res, next) => {
//   console.log('Hello from middleware 2\nRoute: ' + req.originalUrl);
//   next();
// };

// router.use(middleware1);

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

// router.use(middleware2);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
