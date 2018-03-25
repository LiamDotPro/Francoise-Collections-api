'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = require('restify-router');

var _authentication = require('../../library/Accounts/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Passport = require('../../library/Passport/Passport');

var _Passport2 = _interopRequireDefault(_Passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Passport Data

/**
 * Path imports
 */
var ExtractJwt = _passportJwt2.default.ExtractJwt;

// token options.
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

var router = new _restifyRouter.Router();
var auth = new _authentication2.default();
var passport = new _Passport2.default().passport;

/**
 * Routes
 */
router.post('/login', function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        res.json({
            message: 'bad',
            error: 'Username or Password not found.'
        });
        return next();
    }

    auth.login(req.body.email, req.body.password).then(function (_res) {

        console.log(req.body.email, req.body.password);

        if (_res.payload !== 11) {
            res.json({
                message: 'bad',
                error: 'Username or Password not found.'
            });
            return next();
        }

        var payload = {
            id: _res.user.id
        };
        // Sets expiration date
        var token = _jsonwebtoken2.default.sign(payload, jwtOptions.secretOrKey, { expiresIn: 60 * 60 });
        res.json({ message: 'ok', token: token });
        return next();
    });
});

router.get('/account', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    console.log('test');
});

router.post('/', function (req, res, next) {
    res.send({});
    next();
});

exports.default = router;
//# sourceMappingURL=accounts.js.map