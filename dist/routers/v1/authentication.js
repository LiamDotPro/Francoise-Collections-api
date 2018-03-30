'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = require('restify-router');

var _Passport = require('../../library/Passport/Passport');

var _Passport2 = _interopRequireDefault(_Passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
/**
 * Path imports
 */


var router = new _restifyRouter.Router();
var passport = new _Passport2.default().passport;

/**
 * Routes
 */
router.post('/login', passport.authenticate('local'), function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        //res.redirect('dashboard', next);
                        res.send({ msg: 'Success', payload: 0, status: req.session });
                        return _context.abrupt('return', next());

                    case 2:
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

router.post('/logout', function (req, res, next) {});

router.post('/validate', _Passport.requireAuthenticated, function (req, res, next) {
    res.json({ msg: 'Successfully logged in against user.' });
    next();
});

exports.default = router;
//# sourceMappingURL=authentication.js.map