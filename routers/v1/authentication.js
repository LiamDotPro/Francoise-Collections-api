import express from 'express';
import configuredPassport, {requireAuthenticated} from '../../library/Passport/Passport';

let router = express.Router();
const passport = new configuredPassport().passport;

/**
 * Routes
 */
router.post('/login', passport.authenticate('local'), async (req, res) => {
    //res.redirect('dashboard', next);
    res.send({msg: 'Success', payload: 0, status: req.session});
});

router.post('/logout', (req, res) => {
    req.logout();
    res.send({msg: 'You have been successfully logged out', payload: 0});
});

/**
 * This route is only available during development.
 */
if (process.env.ENVIROMENT === 'development') {
    router.post('/validate', requireAuthenticated, (req, res) => {
        res.json({msg: 'Successfully logged in against user.', payload: 0});
    });
}

export default router;