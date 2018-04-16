'use strict';

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();


// Include files to test here.

var assert = require('chai').assert;

describe('Customers', function () {
        describe('Customers Library', function () {

                it('Should create a new customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                        switch (_context.prev = _context.next) {
                                                case 0:
                                                case 'end':
                                                        return _context.stop();
                                        }
                                }
                        }, _callee, undefined);
                })));

                it('Should get the previously created customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                        switch (_context2.prev = _context2.next) {
                                                case 0:
                                                case 'end':
                                                        return _context2.stop();
                                        }
                                }
                        }, _callee2, undefined);
                })));

                it('Should get all the customers', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                        switch (_context3.prev = _context3.next) {
                                                case 0:
                                                case 'end':
                                                        return _context3.stop();
                                        }
                                }
                        }, _callee3, undefined);
                })));

                it('Should update the previously made customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                        switch (_context4.prev = _context4.next) {
                                                case 0:
                                                case 'end':
                                                        return _context4.stop();
                                        }
                                }
                        }, _callee4, undefined);
                })));

                it('Should delete the previously made customer', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                        switch (_context5.prev = _context5.next) {
                                                case 0:
                                                case 'end':
                                                        return _context5.stop();
                                        }
                                }
                        }, _callee5, undefined);
                })));
        });
});
//# sourceMappingURL=customers.js.map