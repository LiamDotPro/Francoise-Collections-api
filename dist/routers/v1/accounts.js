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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
/**
 * Path imports
 */


// Passport Data
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
router.post('/login', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(!req.body.email || !req.body.password)) {
                            _context.next = 3;
                            break;
                        }

                        res.json({
                            message: 'bad',
                            error: 'Username or Password not found.'
                        });
                        return _context.abrupt('return', next());

                    case 3:

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

                            // setup session
                            req.session.key_name = _res.user.id;

                            // Sets expiration date
                            var token = _jsonwebtoken2.default.sign(payload, jwtOptions.secretOrKey, { expiresIn: 60 * 60 });
                            res.json({ message: 'ok', token: token });
                            return next();
                        });

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/account', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    res.json({ session: req.session });
    next();
});

router.post('/', function (req, res, next) {
    res.send({});
    next();
});

exports.default = router;
//# sourceMappingURL=accounts.js.map