'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.requireAuthenticated = requireAuthenticated;

var _authentication = require('../Accounts/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();
var auth = new _authentication2.default();
var LocalStrategy = require('passport-local').Strategy;

var ConfiguredPassport = function () {
    function ConfiguredPassport() {
        _classCallCheck(this, ConfiguredPassport);

        this.passport = _passport2.default;
    }

    _createClass(ConfiguredPassport, [{
        key: 'configurePassport',
        value: function configurePassport() {
            var _this = this;

            this.passport.serializeUser(function (id, done) {
                done(null, id);
            });

            this.passport.deserializeUser(function (id, done) {
                done(null, id);
            });

            var strategy = new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password'
            }, function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password, done) {
                    var authResult;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return auth.validateUser(email, password);

                                case 3:
                                    authResult = _context.sent;

                                    if (!(authResult.payload !== 11)) {
                                        _context.next = 6;
                                        break;
                                    }

                                    return _context.abrupt('return', done(null, false, { message: "Incorrect email or password supplied" }));

                                case 6:
                                    return _context.abrupt('return', done(null, authResult.user.id));

                                case 9:
                                    _context.prev = 9;
                                    _context.t0 = _context['catch'](0);
                                    return _context.abrupt('return', done(null, false, { message: "An error occurred while trying to login.." }));

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 9]]);
                }));

                return function (_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }());

            this.passport.use('local', strategy);
            //this.passport.use('admin', adminStrategy);
        }
    }]);

    return ConfiguredPassport;
}();

exports.default = ConfiguredPassport;
function requireAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/', next);
}
//# sourceMappingURL=Passport.js.map