'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _authenticationBase2 = require('./authenticationBase');

var _authenticationBase3 = _interopRequireDefault(_authenticationBase2);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Database Class.


// Accounts Model
var accounts = _index2.default.accounts;

/**
 * Payload Numbering
 *
 * 0 Success
 * 1 Failure
 * 10 Account Creation
 * 11 Successful Login
 */

var authentication = function (_authenticationBase) {
    _inherits(authentication, _authenticationBase);

    function authentication() {
        _classCallCheck(this, authentication);

        return _possibleConstructorReturn(this, (authentication.__proto__ || Object.getPrototypeOf(authentication)).call(this));
    }

    /**
     * List of error handling and checks.
     *
     * Duplicate Entry Test
     * length Test
     * @todo test with postman for if extra length is needed, also implementing special char check regexp
     * @param email
     * @param password
     * @constructor
     */


    _createClass(authentication, [{
        key: 'registerUser',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {
                var result, res;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.checkForDuplicateAccount(email.toLowerCase());

                            case 2:
                                result = _context.sent;

                                if (!(result.payload !== 0)) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return', {
                                    msg: result.msg
                                });

                            case 5:
                                if (!(result.payload !== 0)) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt('return', {
                                    msg: result.msg
                                });

                            case 7:
                                _context.next = 9;
                                return this.createAccount(email.toLowerCase(), password);

                            case 9:
                                res = _context.sent;
                                return _context.abrupt('return', {
                                    msg: 'New Account Created.',
                                    payload: res.payload
                                });

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function registerUser(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return registerUser;
        }()

        /**
         * Separate method from the attempt to validate specifically so we can add extra
         * checks and further integration later if without worrying about moving stuff
         * to methods.
         * @param email
         * @param password
         */

    }, {
        key: 'login',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, password) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.validateUser(email, password);

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function login(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return login;
        }()

        /**
         * Updates a users password provided they pass the original current password.
         * @param currPass
         * @param newPass
         * @param userID
         */

    }, {
        key: 'updateUserPassword',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(currPass, newPass, userID) {
                var res, compare;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.getUserPasswordHash(userID);

                            case 2:
                                res = _context3.sent;

                                if (!(res.payload > 0)) {
                                    _context3.next = 5;
                                    break;
                                }

                                return _context3.abrupt('return', {
                                    payload: 1,
                                    msg: 'Account could not be found when attempting to change passwords'
                                });

                            case 5:
                                _context3.next = 7;
                                return this.comparePasswords(res.hash, currPass);

                            case 7:
                                compare = _context3.sent;

                                if (compare) {
                                    _context3.next = 10;
                                    break;
                                }

                                return _context3.abrupt('return', {
                                    payload: 1,
                                    msg: 'Current Password does not match'
                                });

                            case 10:
                                _context3.next = 12;
                                return this.insertNewHashedPassword(userID, newPass);

                            case 12:
                                return _context3.abrupt('return', _context3.sent);

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateUserPassword(_x5, _x6, _x7) {
                return _ref3.apply(this, arguments);
            }

            return updateUserPassword;
        }()
    }]);

    return authentication;
}(_authenticationBase3.default);

exports.default = authentication;
//# sourceMappingURL=authentication.js.map