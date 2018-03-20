import {Router} from 'restify-router';

const router = new Router();

router.get('/test', (req, res, next) => {
    res.send({message: 'This is a test!'});
    next();
});

export default router;