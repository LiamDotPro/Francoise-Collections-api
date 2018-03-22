// Configure out environment to be available.
require('dotenv').config();

import {Router} from 'restify-router';

// Stripe Payment Integration
const keyPublishable = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = new Router();

/**
 * Takes a subsequent cart ID and confirms all items are in stock and generates the amount due.
 * Following this the user is returned the Amount alongside server side served build information.
 */
router.post('/createPaymentButton', (req, res, next) => {
    res.send({});
    next();
});

/**
 * This endpoint handles the processing of information subsequent to a successful checkout using stripe checkout.
 * Furthermore the cart total and inventory
 */
router.post('/processPayment', (req, res, next) => {
    res.send({});
    next();
});


export default router;