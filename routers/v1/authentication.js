import {Router} from 'restify-router';
/**
 * Path imports
 */
import configuredPassport, {requireAuthenticated} from '../../library/Passport/Passport';

const router = new Router();
const passport = new configuredPassport().passport;

/**
 * Routes
 */
router.post('/login', passport.authenticate('local'), async (req, res, next) => {
    //res.redirect('dashboard', next);
    res.send({msg: 'Success', payload: 0, status: req.session});
    return next();
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.send({msg: 'You have been successfully logged out', payload: 0});
    return next();
});

/**
 * This route is only available during development.
 */
if (process.env.ENVIROMENT === 'development') {
    router.post('/validate', requireAuthenticated, (req, res, next) => {
        res.json({msg: 'Successfully logged in against user.', payload: 0});
        return next();
    });
}

export default router;