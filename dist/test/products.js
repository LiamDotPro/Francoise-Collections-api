'use strict';

require('babel-polyfill');

var _productsBase = require('../library/Products/productsBase');

var _productsBase2 = _interopRequireDefault(_productsBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var assert = require('chai').assert;

var products = new _productsBase2.default();

describe('Products', function () {
        describe('Products Base Library', function () {

                it('Should create a new product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                        switch (_context.prev = _context.next) {
                                                case 0:
                                                case 'end':
                                                        return _context.stop();
                                        }
                                }
                        }, _callee, undefined);
                }))
                //let result = await products.createProduct('Test Product', 'This is a test item', 'thumbnail.png', 'Dispatches in 2-4 days', 0, false, 10, new Date("2018-03-31 02:00:07.525+01"), new Date("2018-03-31 02:00:07.525+01"));
                //assert.equal(0, result.payload, result.msg);
                );

                it('Should get all products', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                        switch (_context2.prev = _context2.next) {
                                                case 0:
                                                        _context2.next = 2;
                                                        return products.getAllProducts();

                                                case 2:
                                                        result = _context2.sent;

                                                        assert.isAbove(result.productList.length, 0, result.msg);

                                                case 4:
                                                case 'end':
                                                        return _context2.stop();
                                        }
                                }
                        }, _callee2, undefined);
                })));

                it('Should get default product using ID', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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

                it('Should update the previously made product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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

                it('Should delete the previously made product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
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
//# sourceMappingURL=products.js.map