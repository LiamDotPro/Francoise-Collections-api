'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * Routes
 */

/**
 * Create a new product.
 */
router.post('/createProduct', function (req, res, next) {
  res.send({});
  next();
});

/**
 * Get products with pagination.
 */
router.get('/products', function (req, res, next) {
  res.send({});
  next();
});

/**
 * Get all products without pagination.
 */
router.get('/allProducts', function (req, res, next) {
  res.send({});
  next();
});

exports.default = router;
//# sourceMappingURL=products.js.map