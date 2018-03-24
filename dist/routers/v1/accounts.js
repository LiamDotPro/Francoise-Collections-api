'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = require('restify-router');

var _AutenticateFromDB = require('../../library/AutenticateFromDB');

var _AutenticateFromDB2 = _interopRequireDefault(_AutenticateFromDB);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

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
var auth = new _AutenticateFromDB2.default();

/**
 * Routes
 */
router.post('/login', function (req, res) {
    if (req.body.email && req.body.password) {

        var email = req.body.email;
        var password = req.body.password;

        auth.login(email, password).then(function (_res) {
            if (_res.payload === 11) {
                var payload = {
                    id: _res.user.id
                };
                // Sets expiration date
                var token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 60 * 60 });
                res.json({ message: 'ok', token: token });
            } else {
                res.send({
                    message: 'bad',
                    error: 'Username or Password not found.'
                });
            }
        });
    } else {
        res.send({
            message: 'bad',
            error: 'Username or Password not found.'
        });
    }
});

router.post('/', function (req, res, next) {
    res.send({});
    next();
});

exports.default = router;
//# sourceMappingURL=accounts.js.map