'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure out environment to be available.
require('dotenv').config();

var router = _express2.default.Router();

/**
 * Path imports
 */
// Stripe Payment Integration
var keyPublishable = process.env.PUBLISHABLE_KEY;
var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Routes
 */

/**
 * Takes a subsequent cart ID and confirms all items are in stock and generates the amount due.
 * Following this the user is returned the Amount alongside server side served build information.
 *
 * <form action="your-server-side-code" method="POST">
 *  <script
 *  src="https://checkout.stripe.com/checkout.js" class="stripe-button"
 *      data-key="pk_test_DGCRaVVvH9dDOWNcEeK66ulx"
 *      data-amount="999"
 *      data-name="Demo Site"
 *      data-description="Widget"
 *      data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
 *      data-locale="auto"
 *      data-currency="gbp">
 *  </script>
 * </form>
 */
router.post('/createPaymentButton', function (req, res, next) {
  res.send({});
  next();
});

/**
 * Tests connecting sockets with vanilla html page.
 */
router.get('/', function (req, res, next) {
  _fs2.default.readFile('./dist/test-pages/sockets.html', 'utf8', function (err, data) {
    if (err) {
      next(err);
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(data));
    res.writeHead(200);
    res.write(data);
    res.end();
    next();
  });
});

/**
 * This endpoint handles the processing of information subsequent to a successful checkout using stripe checkout.
 * Furthermore the cart total and inventory
 */
router.post('/processPayment', function (req, res, next) {
  res.send({});
  next();
});

exports.default = router;
//# sourceMappingURL=payments.js.map