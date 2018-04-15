import express from 'express';

let router = express.Router();

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