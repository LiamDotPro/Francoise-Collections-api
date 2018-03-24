import {Router} from 'restify-router';

const router = new Router();


/**
 * Path imports
 */

/**
 * Routes
 */

router.get('/login', (req, res, next) => {
    res.send({message: 'This is a test!'});
    next();
});

router.get('/login', (req, res, next) => {
    res.send({message: 'This is a test!'});
    next();
});

export default router;