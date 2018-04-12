import express from 'express';

let router = express.Router();

/**
 * Routes
 */

/**
 * Create a new product.
 */
router.post('/createProduct', (req, res, next) => {
    res.send({});
    next();
});

/**
 * Get products with pagination.
 */
router.get('/products', (req, res, next) => {
    res.send({});
    next();
});

/**
 * Get all products without pagination.
 */
router.get('/allProducts', (req, res, next) => {
    res.send({});
    next();
});

export default router;