'use strict';

var _authenticationBase = require('../library/Accounts/authenticationBase');

var _authenticationBase2 = _interopRequireDefault(_authenticationBase);

var _authentication = require('../library/Accounts/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('chai').assert;

var auth = new _authenticationBase2.default();
var fullAuth = new _authentication2.default();

describe('Accounts', function () {
    describe('Autentication Library', function () {

        var hash = '';

        it('Find the default account by ID', function () {
            return auth.findAccountById(1).then(function (data) {
                return assert.equal(data.email, 'liam@liam.pro');
            });
        });

        it('Create a hash given an arbitary password', function () {
            return auth.encryptPassword('123456789').then(function (hashedPassword) {
                hash = hashedPassword;
                return assert.isOk(hashedPassword, 'Hash Not created');
            });
        });

        it('Correctly compare a hashed password - Correct', function () {
            return auth.comparePasswords(hash, '123456789').then(function (res) {
                return assert.isOk(res);
            });
        });

        it('Correctly compare a hashed password - False', function () {
            return auth.comparePasswords(hash, '12345678').then(function (res) {
                return assert.isNotOk(res);
            });
        });

        it('Should find a duplicate account', function () {
            return auth.checkForDuplicateAccount('liam@liam.pro').then(function (res) {
                assert.equal(res.payload, 1);
            });
        });

        it('Should catch a string that is empty while searching for duplicate', function () {
            return auth.checkForDuplicateAccount('').then(function (res) {
                assert.equal(res.msg, 'Fail - No Email Found');
            });
        });

        it('Should catch a string that is not a complete email while searching for duplicate', function () {
            return auth.checkForDuplicateAccount('asdasd@t').then(function (res) {
                return assert.equal(res.msg, 'Fail - No Email Found', 'Email duplicate check failed with bad email!');
            });
        });

        it('Should Create an account given an email and a password', function () {
            return auth.createAccount('test@test.com', hash).then(function (res) {
                assert.equal(res.payload, 10, 'Test Email was not created!');
            });
        });

        it('Should delete the previously made test account from the database', function () {
            return auth.deleteAccount('test@test.com', '123456789').then(function (res) {
                assert.equal(res.payload, 0, 'Account could not be deleted!');
            });
        });

        it('Should Create an account with the facade class', function () {
            return fullAuth.registerUser('test@test.com', '123456789').then(function (res) {
                assert.equal(res.payload, 10, 'Facade class did not create an account!');
            });
        });

        it('Should Login an existing user with there credentials', function () {
            return fullAuth.login('test@test.com', '123456789').then(function (res) {
                assert.equal(res.payload, 11, 'Not able to login newly created user!');
            });
        });

        it('Should Delete an account created with the facade class', function () {
            return auth.deleteAccount('test@test.com', '123456789').then(function (res) {
                assert.equal(res.payload, 0, 'Account could not be deleted!');
            });
        });
    });
});
//# sourceMappingURL=accounts.js.map