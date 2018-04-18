'use strict';

require('babel-polyfill');

var _CustomersBase = require('../library/Customers/CustomersBase');

var _CustomersBase2 = _interopRequireDefault(_CustomersBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();
// Include files to test here.


var customer = new _CustomersBase2.default();

var assert = require('chai').assert;

describe('Customers', function () {
    describe('Customers Library', function () {

        var createdId = null;

        it('Should create a new customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return customer.createCustomer('Liam', '07710679993', 'liam@liam.pro', '');

                        case 2:
                            result = _context.sent;

                            assert.equal(result.payload, 0, result.msg);
                            createdId = result.insertedId;

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it('Should get the previously created customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return customer.getCustomerById(createdId);

                        case 2:
                            result = _context2.sent;

                            assert.equal(result.customer.id, createdId, result.msg);

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        it('Should get all the customers', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var result;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return customer.getAllCustomers();

                        case 2:
                            result = _context3.sent;

                            assert.isAbove(result.customerList.length, 0, result.msg);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));

        it('Should update the previously made customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var result;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return customer.updateCustomerById(createdId, 'Barry', '07710679993', 'liam@liam.pro', '');

                        case 2:
                            result = _context4.sent;
                            return _context4.abrupt('return', assert.equal(result.payload, 0, result.msg));

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        })));

        it('Should delete the previously made customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var result;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return customer.deleteCustomerById(createdId);

                        case 2:
                            result = _context5.sent;
                            return _context5.abrupt('return', assert.isTrue(result, result.msg));

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        })));
    });
});
//# sourceMappingURL=customers.js.map