'use strict';

require('babel-polyfill');

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _authenticationBase = require('../library/Accounts/authenticationBase');

var _authenticationBase2 = _interopRequireDefault(_authenticationBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var assert = require('chai').assert;

var accounts = _index2.default.accounts;
var auth = new _authenticationBase2.default();

describe('Test', function () {
    describe('create a user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var password;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return auth.encryptPassword('Belkinlr93.');

                    case 2:
                        password = _context.sent;

                        accounts.create({
                            u_email: 'liam.pro',
                            u_password: password,
                            accountType: 2,
                            fullname: 'Liam Read'
                        }).then(function (user) {
                            console.log(user);
                        });

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));
});
//# sourceMappingURL=authentication.js.map