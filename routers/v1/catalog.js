import express from 'express';

let router = express.Router();


/**
 * Path imports
 */

/**
 * Routes
 */

router.get('/', (req, res, next) => {
    res.send({});
    next();
});

router.post('/', (req, res, next) => {
    res.send({});
    next();
});

export default router;