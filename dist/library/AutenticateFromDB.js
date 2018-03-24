'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Invoke database connection to allow users to be found within the database.


var _db = require('../db/db');

var _db2 = _interopRequireDefault(_db);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var authenticateFromDB = function () {
    function authenticateFromDB() {
        _classCallCheck(this, authenticateFromDB);
    }

    _createClass(authenticateFromDB, [{
        key: 'RegisterUser',


        /**
         * This function handles an incoming request to register a new user within a system.
         * Makes use of the bcrypt dependency for hashing users passwords.
         * @constructor
         */
        value: function RegisterUser(email, password) {
            return this.checkIfAlreadyRegistered(email).then(function (res) {
                if (res.result === 'success') {} else {}
            });
        }
    }, {
        key: 'checkIfAlreadyRegistered',
        value: function checkIfAlreadyRegistered(email) {
            return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                return connection.query('Select * from accounts where email=?', [email]).then(function (res) {
                    if (res.length > 0) {
                        return {
                            result: 'fail',
                            message: 'The Email you entered is already registered.'
                        };
                    } else {
                        return {
                            result: 'success'
                        };
                    }
                });
            });
        }

        /**
         * This function handles the verification of a user attempting to login to the system.
         * Makes use of bcrypt to handle decrypting of passwords.
         * @constructor
         */

    }, {
        key: 'VerifyLoginAttempt',
        value: function VerifyLoginAttempt(email, password) {

            // Returns a promise that resolves once the user has been successfully identified within the database.
            return _bluebird2.default.resolve(validateUser(password, email));

            /**
             * Compares a password against a hash within the database, returns a boolean if truthness can be asserted.
             * @param password
             * @param hash
             * @returns {Promise.<Boolean>}
             */
            function comparePasswords(password, hash) {
                return _bcrypt2.default.compare(password, hash).then(function (res) {
                    return res === true;
                });
            }

            /**
             * Validates a user using the bcrypt compare function and returns an object if found and password matches.
             * Returns false on all other routes and logs a error if an unexpected error is caught.
             * @param password
             * @param email
             */
            function validateUser(password, email) {
                return _bluebird2.default.using((0, _db2.default)(), function (connection) {
                    return connection.query('Select * from accounts where email=?', [email]).then(function (res) {
                        // Firstly test if a record can be found
                        if (res.length > 0) {
                            return comparePasswords(password, res[0].password).then(function (resPass) {
                                if (resPass === true) {
                                    return {
                                        result: {
                                            id: res[0].id,
                                            email: res[0].email
                                        },
                                        status: 1
                                    };
                                } else {
                                    return {
                                        result: false,
                                        status: 1
                                    };
                                }
                            });
                        } else {
                            // No user found
                            return {
                                result: false,
                                status: 1
                            };
                        }
                    }).catch(function (err) {
                        console.log(err);
                        return { err: err };
                    });
                });
            }
        }
    }]);

    return authenticateFromDB;
}();

exports.default = authenticateFromDB;
//# sourceMappingURL=AutenticateFromDB.js.map