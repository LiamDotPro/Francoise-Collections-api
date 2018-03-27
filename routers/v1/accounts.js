import {Router} from 'restify-router';
/**
 * Path imports
 */
import Authentication from '../../library/Accounts/authentication';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import configuredPassport from '../../library/Passport/Passport';

// Passport Data
let ExtractJwt = passportJWT.ExtractJwt;

// token options.
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const router = new Router();
const auth = new Authentication();
const passport = new configuredPassport().passport;

/**
 * Routes
 */
router.post('/login', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            message: 'bad',
            error: 'Username or Password not found.'
        });
        return next();
    }

    auth.login(req.body.email, req.body.password).then((_res) => {

        console.log(req.body.email, req.body.password);

        if (_res.payload !== 11) {
            res.json({
                message: 'bad',
                error: 'Username or Password not found.'
            });
            return next();
        }

        let payload = {
            id: _res.user.id
        };

        // setup session
        req.session.key_name = _res.user.id;

        // Sets expiration date
        let token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: 60 * 60});
        res.json({message: 'ok', token: token});
        return next();
    })
});

router.get('/account', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({session: req.session});
    next();
});

router.post('/', (req, res, next) => {
    res.send({});
    next();
});

export default router;