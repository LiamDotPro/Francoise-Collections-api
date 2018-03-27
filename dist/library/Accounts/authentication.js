'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _authenticationBase2 = require('./authenticationBase');

var _authenticationBase3 = _interopRequireDefault(_authenticationBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
     * @returns {Promise.<TResult>}
     * @constructor
     */


    _createClass(authentication, [{
        key: 'registerUser',
        value: function registerUser(email, password) {
            var _this2 = this;

            return this.checkForDuplicateAccount(email.toLowerCase()).then(function (res) {

                if (res.payload !== 0) {
                    return {
                        msg: res.msg
                    };
                }

                if (password.length <= 5) {
                    return {
                        msg: 'Password not long enough'
                    };
                }

                return _this2.encryptPassword(password).then(function (pass) {
                    return _this2.createAccount(email.toLowerCase(), pass).then(function (res) {
                        return {
                            msg: 'New Account Created.',
                            payload: res.payload
                        };
                    });
                });
            });
        }

        /**
         * Separate method from the attempt to validate specifically so we can add extra
         * checks and further integration later if without worrying about moving stuff
         * to methods.
         * @param email
         * @param password
         */

    }, {
        key: 'login',
        value: function login(email, password) {
            return this.validateUser(email, password).then(function (res) {
                return res;
            });
        }

        /**
         * Updates a users password provided they pass the original current password.
         * @param currPass
         * @param newPass
         * @param userID
         * @returns {Bluebird<any> | Promise.<TResult>}
         */

    }, {
        key: 'updateUserPassword',
        value: function updateUserPassword(currPass, newPass, userID) {
            var _this3 = this;

            return this.getUserPasswordHash(userID).then(function (res) {
                return _this3.comparePasswords(res.hash, currPass);
            }).then(function (res) {
                if (!res) {
                    return {
                        status: 'err',
                        message: 'Current Password does not match'
                    };
                }
                return _this3.insertNewHashedPassword(userID, newPass);
            });
        }
    }]);

    return authentication;
}(_authenticationBase3.default);

exports.default = authentication;
//# sourceMappingURL=authentication.js.map