'use strict';

require('babel-polyfill');

var _productsBase = require('../library/Products/productsBase');

var _productsBase2 = _interopRequireDefault(_productsBase);

var _InventoriesBase = require('../library/Inventories/InventoriesBase');

var _InventoriesBase2 = _interopRequireDefault(_InventoriesBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var assert = require('chai').assert;

var products = new _productsBase2.default();
var inventories = new _InventoriesBase2.default();

describe('Products', function () {
    describe('Products Base Library', function () {

        var createdItemId = null;

        it('Should create a new product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return products.createProduct('Test Product', 'This is a test item', 'thumbnail.png', 'Dispatches in 2-4 days', 0, false, new Date("2018-03-31 02:00:07.525+01"), new Date("2018-03-31 02:00:07.525+01"));

                        case 2:
                            result = _context.sent;

                            createdItemId = result.insertedId;
                            return _context.abrupt('return', assert.equal(0, result.payload, result.msg));

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it('Should find an inventory for the product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return inventories.getInventoryByProductId(createdItemId);

                        case 2:
                            result = _context2.sent;

                            assert.equal(result.inventory.productIdentifer, createdItemId, result.msg);

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        it('Should update the previously made product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var result;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return products.updateProductById(createdItemId, 'Test Product Updated', 'This is a test item', 'thumbnail.png', 'Dispatches in 2-4 days', 0, false, new Date("2018-03-31 02:00:07.525+01"), new Date("2018-03-31 02:00:07.525+01"));

                        case 2:
                            result = _context3.sent;
                            return _context3.abrupt('return', assert.equal(0, result.payload, result.msg));

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));

        it('Should get all products', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var result;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return products.getAllProducts();

                        case 2:
                            result = _context4.sent;
                            return _context4.abrupt('return', assert.isAbove(result.productList.length, 0, result.msg));

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        })));

        it('Should get default product using ID', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var result;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return products.getProductById(createdItemId);

                        case 2:
                            result = _context5.sent;
                            return _context5.abrupt('return', assert.equal(0, result.payload, result.msg));

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        })));

        it('Should get products based on pagination', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var result;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return products.getProductsByPagination(1);

                        case 2:
                            result = _context6.sent;

                            assert.equal(0, result.payload, result.msg);

                        case 4:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        })));

        it('Should validate that the product has had its title updated', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var result;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return products.getProductById(createdItemId);

                        case 2:
                            result = _context7.sent;

                            assert.equal('Test Product Updated', result.product.productName, result.msg);

                        case 4:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined);
        })));

        it('Should delete the previously made product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var result;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return products.deleteProduct(createdItemId);

                        case 2:
                            result = _context8.sent;
                            return _context8.abrupt('return', assert.isTrue(result, "Record could not be deleted.."));

                        case 4:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, undefined);
        })));
    });
});
//# sourceMappingURL=products.js.map