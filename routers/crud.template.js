import {Router} from 'restify-router';

const router = new Router();


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