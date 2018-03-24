import {Router} from 'restify-router';
/**
 * Path imports
 */
import Authentication from '../../library/AutenticateFromDB';
import passportJWT from 'passport-jwt';


// Passport Data
let ExtractJwt = passportJWT.ExtractJwt;

// token options.
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const router = new Router();
const auth = new Authentication();

/**
 * Routes
 */
router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {

        let email = req.body.email;
        let password = req.body.password;

        auth.login(email, password).then((_res) => {
            if (_res.payload === 11) {
                let payload = {
                    id: _res.user.id
                };
                // Sets expiration date
                let token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: 60 * 60});
                res.json({message: 'ok', token: token});
            } else {
                res.send({
                    message: 'bad',
                    error: 'Username or Password not found.'
                })
            }
        })
    } else {
        res.send({
            message: 'bad',
            error: 'Username or Password not found.'
        })
    }
});

router.post('/', (req, res, next) => {
    res.send({});
    next();
});

export default router;