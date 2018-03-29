'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _db = require('../../db/db');

var _db2 = _interopRequireDefault(_db);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();
// Database Class.

// Accounts Model
var accounts = _index2.default.accounts;

/**
 * Abstract class that acts as the concrete functions for our registering api.
 */

var authenticationBase = function () {
    function authenticationBase() {
        _classCallCheck(this, authenticationBase);

        if (process.env.ENVIROMENT === 'production' && new.target === authenticationBase) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     * Encrypts plain text passwords using a safe encryption method.
     * @param password String
     */


    _createClass(authenticationBase, [{
        key: 'encryptPassword',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _bcrypt2.default.hash(password, 10);

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function encryptPassword(_x) {
                return _ref.apply(this, arguments);
            }

            return encryptPassword;
        }()

        /**
         * Validates a user from within the database.
         * @param email
         * @param password
         */

    }, {
        key: 'validateUser',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, password) {
                var foundAccounts, res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return accounts.findAll({ where: { u_email: email } });

                            case 2:
                                foundAccounts = _context2.sent;

                                if (!(!foundAccounts.length > 0)) {
                                    _context2.next = 5;
                                    break;
                                }

                                return _context2.abrupt('return', {
                                    msg: 'Account or password did not match!',
                                    payload: 1
                                });

                            case 5:
                                _context2.next = 7;
                                return this.comparePasswords(foundAccounts[0].dataValues.u_password, password);

                            case 7:
                                res = _context2.sent;

                                if (res) {
                                    _context2.next = 11;
                                    break;
                                }

                                console.log("Second");
                                return _context2.abrupt('return', {
                                    msg: 'Account or password did not match!',
                                    payload: 1
                                });

                            case 11:
                                return _context2.abrupt('return', {
                                    msg: 'Success',
                                    payload: 11,
                                    user: {
                                        id: foundAccounts[0].dataValues.id
                                    }
                                });

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function validateUser(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return validateUser;
        }()

        /**
         * This does a simple bcrypt comparision to identify correctness.
         * @param hash
         * @param plainText
         */

    }, {
        key: 'comparePasswords',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(hash, plainText) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _bcrypt2.default.compare(plainText, hash);

                            case 2:
                                return _context3.abrupt('return', _context3.sent);

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function comparePasswords(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return comparePasswords;
        }()

        /**
         * Checks to make sure an email is present within a string.
         * @param text
         * @returns {boolean}
         */

    }, {
        key: 'checkIfEmailInString',
        value: function checkIfEmailInString(text) {
            var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            return re.test(text);
        }

        /**
         * This checks for a duplicate account inside the database.
         * Payload is a boolean Int
         */

    }, {
        key: 'checkForDuplicateAccount',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(email) {
                var result;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(email.length < 5 || !this.checkIfEmailInString(email))) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt('return', {
                                    msg: 'Fail - No Email Found',
                                    payload: 1
                                });

                            case 2:
                                _context4.next = 4;
                                return accounts.findAll({
                                    where: {
                                        u_email: email
                                    }
                                });

                            case 4:
                                result = _context4.sent;

                                if (!(result.length !== 0)) {
                                    _context4.next = 7;
                                    break;
                                }

                                return _context4.abrupt('return', {
                                    msg: 'Fail - Duplicate Account',
                                    payload: 1
                                });

                            case 7:
                                return _context4.abrupt('return', {
                                    msg: 'Success',
                                    payload: 0
                                });

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function checkForDuplicateAccount(_x6) {
                return _ref4.apply(this, arguments);
            }

            return checkForDuplicateAccount;
        }()

        /**
         * Find Account by Id
         */

    }, {
        key: 'findAccountById',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
                var res;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return accounts.findAll({
                                    where: {
                                        id: id
                                    }
                                });

                            case 2:
                                res = _context5.sent;
                                return _context5.abrupt('return', res.length > 0 ? {
                                    name: res[0].dataValues.fullname,
                                    email: res[0].dataValues.u_email,
                                    msg: 'success'
                                } : false);

                            case 4:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function findAccountById(_x7) {
                return _ref5.apply(this, arguments);
            }

            return findAccountById;
        }()

        /**
         * Find Account By Id and also verify account status as being administrator.
         */

    }, {
        key: 'findAccountByIdAdmin',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
                var res;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return accounts.findAll({
                                    where: {
                                        id: id
                                    }
                                });

                            case 2:
                                res = _context6.sent;

                                if (!(res.length === 0)) {
                                    _context6.next = 5;
                                    break;
                                }

                                return _context6.abrupt('return', false);

                            case 5:
                                if (!(!res[0].dataValues.hasOwnProperty('accountType') || res[0].dataValues.accountType !== 2)) {
                                    _context6.next = 7;
                                    break;
                                }

                                return _context6.abrupt('return', false);

                            case 7:
                                return _context6.abrupt('return', {
                                    name: res[0].dataValues.fullname,
                                    email: res[0].dataValues.u_email,
                                    accountType: res[0].dataValues.accountType,
                                    msg: 'success'
                                });

                            case 8:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function findAccountByIdAdmin(_x8) {
                return _ref6.apply(this, arguments);
            }

            return findAccountByIdAdmin;
        }()

        /**
         * This is the last part of the system.
         * All passwords should be ran through bcrypt before being inserted.
         * @param email
         * @param password string
         */

    }, {
        key: 'createAccount',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(email, password) {
                var pass, createdAccount;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.encryptPassword(password);

                            case 2:
                                pass = _context7.sent;
                                _context7.next = 5;
                                return accounts.create({
                                    u_email: email,
                                    u_password: pass,
                                    accountType: 1,
                                    fullname: ''
                                });

                            case 5:
                                createdAccount = _context7.sent;
                                return _context7.abrupt('return', {
                                    msg: 'Success', payload: 10
                                });

                            case 7:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function createAccount(_x9, _x10) {
                return _ref7.apply(this, arguments);
            }

            return createAccount;
        }()

        /**
         * Permanently removes an account from the system.
         *
         * Usage of this method should be heavily guarded as it is a standardized method that provides only base functionality with no security.
         */

    }, {
        key: 'deleteAccount',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(email, password) {
                var userObj, bool;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.getUserPasswordHashWithEmail(email);

                            case 2:
                                userObj = _context8.sent;

                                if (userObj.user.dataValues.hasOwnProperty('u_password')) {
                                    _context8.next = 5;
                                    break;
                                }

                                return _context8.abrupt('return', { msg: 'An error occurred.', payload: 1 });

                            case 5:
                                _context8.next = 7;
                                return this.comparePasswords(userObj.user.dataValues.u_password, password);

                            case 7:
                                bool = _context8.sent;

                                if (bool) {
                                    _context8.next = 10;
                                    break;
                                }

                                return _context8.abrupt('return', { msg: 'Incorrect password provided for account delete', payload: 1 });

                            case 10:
                                _context8.next = 12;
                                return userObj.user.destroy({ force: true });

                            case 12:
                                return _context8.abrupt('return', { msg: 'Success', payload: 0 });

                            case 13:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function deleteAccount(_x11, _x12) {
                return _ref8.apply(this, arguments);
            }

            return deleteAccount;
        }()

        /**
         * Gets the users hashed and salted password for the database.
         * This method is only to be used when a validated user with an existing profile makes a call.
         * @param userID
         */

    }, {
        key: 'getUserPasswordHash',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(userID) {
                var res;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return accounts.findAll({
                                    where: {
                                        id: userID
                                    }
                                });

                            case 2:
                                res = _context9.sent;

                                if (!(!res.length > 0)) {
                                    _context9.next = 5;
                                    break;
                                }

                                return _context9.abrupt('return', { msg: 'Fail', payload: 1 });

                            case 5:
                                return _context9.abrupt('return', { hash: res[0].dataValues.u_password, msg: 'Success', payload: 0 });

                            case 6:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function getUserPasswordHash(_x13) {
                return _ref9.apply(this, arguments);
            }

            return getUserPasswordHash;
        }()

        /**
         * Helper method that get's a user hash using there email address, to be used alongside deletion of an existing account.
         * @param email
         */

    }, {
        key: 'getUserPasswordHashWithEmail',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(email) {
                var res;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return accounts.findAll({
                                    where: {
                                        u_email: email
                                    }
                                });

                            case 2:
                                res = _context10.sent;

                                if (!(!res.length > 0)) {
                                    _context10.next = 5;
                                    break;
                                }

                                return _context10.abrupt('return', { msg: 'No Email found in accounts.', payload: 1 });

                            case 5:
                                return _context10.abrupt('return', { user: res[0], payload: 0 });

                            case 6:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function getUserPasswordHashWithEmail(_x14) {
                return _ref10.apply(this, arguments);
            }

            return getUserPasswordHashWithEmail;
        }()

        /**
         * Inserts a new hashed password into the user account.
         * @param id
         * @param password
         */

    }, {
        key: 'insertNewHashedPassword',
        value: function insertNewHashedPassword(id, password) {
            return this.encryptPassword(password).then(function (hash) {
                return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                    return connection.query('UPDATE `accounts` SET u_password=? WHERE id=?', [hash, id]).then(function () {
                        return {
                            status: 'ok',
                            message: 'Password Changed!'
                        };
                    });
                });
            });
        }
    }]);

    return authenticationBase;
}();

exports.default = authenticationBase;
//# sourceMappingURL=authenticationBase.js.map