'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../../db/db');

var _db2 = _interopRequireDefault(_db);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

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
        value: function encryptPassword(password) {
            return _bcrypt2.default.hash(password, 10).then(function (hash) {
                return hash;
            });
        }

        /**
         * Validates a user from within the database.
         * @param email
         * @param password
         */

    }, {
        key: 'validateUser',
        value: function validateUser(email, password) {
            var _this = this;

            return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                return connection.query('Select id, u_email, u_password FROM `accounts` Where userName=?', [email.toLowerCase()]).then(function (_res) {
                    // Check if we have that account.
                    if (!_res.length > 0) {
                        return {
                            msg: 'Fail',
                            payload: 1
                        };
                    }

                    return _this.comparePasswords(_res[0].u_password, password).then(function (res) {
                        // Incorrect password found.
                        if (!res) {
                            return {
                                msg: 'Fail',
                                payload: 1
                            };
                        }

                        // All checks have passed.
                        return {
                            msg: 'Success',
                            payload: 11,
                            user: {
                                id: _res[0].id
                            }
                        };
                    });
                });
            });
        }

        /**
         * This does a simple bcrypt comparision to identify correctness.
         * @param hash
         * @param plainText
         */

    }, {
        key: 'comparePasswords',
        value: function comparePasswords(hash, plainText) {
            return _bcrypt2.default.compare(plainText, hash).then(function (res) {
                return res === true;
            });
        }

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
        value: function checkForDuplicateAccount(email) {
            var _this2 = this;

            return _bluebird2.default.using((0, _db2.default)(), function (connection) {

                if (email.length < 5 || !_this2.checkIfEmailInString(email)) {
                    return {
                        msg: 'Fail - No Email Found',
                        payload: 1
                    };
                }

                return connection.query('SELECT `u_email` FROM `accounts` WHERE u_email=?', [email.toLowerCase()]).then(function (res) {
                    if (res.length !== 0) {
                        return {
                            msg: 'Fail - Duplicate Account',
                            payload: 1
                        };
                    }

                    // No duplicate found.
                    return {
                        msg: 'Success',
                        payload: 0
                    };
                }).catch(function (e) {
                    console.log(e);
                });
            });
        }

        /**
         * Find Account by Id
         */

    }, {
        key: 'findAccountById',
        value: function findAccountById(id) {
            return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                return connection.query('SELECT id, u_email FROM `accounts` WHERE id=?', [id]).then(function (res) {
                    return res.length > 0 ? {
                        name: res[0].fullName,
                        email: res[0].u_email,
                        msg: 'success'
                    } : false;
                });
            });
        }

        /**
         * This is the last part of the system.
         * All passwords should be ran through bcrypt before being inserted.
         * @param email
         * @param password
         */

    }, {
        key: 'createAccount',
        value: function createAccount(email, password) {
            return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                return connection.query('INSERT INTO `accounts` (u_email, u_password, accountType) VALUES (?, ?, 1)', [email.toLowerCase(), password]).then(function (res) {
                    return { msg: 'Success', payload: 10 };
                });
            }).catch(function (e) {
                console.log(e);
            });
        }

        /**
         * Permanently removes an account from the system.
         *
         * Usage of this method should be heavily guarded as it is a standardized method that provides only base functionality with no security.
         */

    }, {
        key: 'deleteAccount',
        value: function deleteAccount(email, password) {
            var _this3 = this;

            return this.getUserPasswordHashWithEmail(email).then(function (res) {

                // No has is returned with false'y calls.
                if (!res.hasOwnProperty('hash')) {
                    return res;
                }

                // Compare passwords.
                return _this3.comparePasswords(res.hash, password).then(function (bool) {
                    if (!bool) {
                        return { msg: 'Incorrect password provided for account delete', payload: 0 };
                    }

                    // Finally delete the account.
                    return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                        return connection.query('DELETE FROM `accounts` WHERE u_email=?', [email]).then(function (res) {
                            return { msg: 'Account Successfully Deleted.', payload: 0 };
                        });
                    });
                }).catch(function (e) {
                    console.log(e);
                });
            }).catch(function (e) {
                console.log(e);
            });
        }

        /**
         * Gets the users hashed and salted password for the database.
         * This method is only to be used when a validated user with an existing profile makes a call.
         * @param userID
         */

    }, {
        key: 'getUserPasswordHash',
        value: function getUserPasswordHash(userID) {
            return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                return connection.query('SELECT u_password from `accounts` WHERE id=?', [userID]).then(function (res) {
                    return { hash: res[0].u_password };
                });
            });
        }

        /**
         * Helper method that get's a user hash using there email address, to be used alongside deletion of an existing account.
         * @param email
         * @returns {Bluebird<any>}
         */

    }, {
        key: 'getUserPasswordHashWithEmail',
        value: function getUserPasswordHashWithEmail(email) {
            return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                return connection.query('SELECT u_password from `accounts` WHERE u_email=?', [email]).then(function (res) {
                    if (!res.length > 0) {
                        return { msg: 'No Email found in accounts.', payload: 1 };
                    }

                    return { hash: res[0].u_password };
                });
            });
        }

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