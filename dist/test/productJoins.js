'use strict';

require('babel-polyfill');

var _productsBase = require('../library/Products/productsBase');

var _productsBase2 = _interopRequireDefault(_productsBase);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var assert = require('chai').assert;

var products = new _productsBase2.default();

describe('Product Joins', function () {
    describe('Product Join tests', function () {

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

        it('Should get the newly created product joined with Inventories table.', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _index2.default.product.findAll({
                                where: {
                                    id: createdItemId
                                },
                                include: [{
                                    model: _index2.default.inventory,
                                    where: {
                                        productIdentifer: createdItemId
                                    }
                                }]
                            });

                        case 2:
                            result = _context2.sent;
                            return _context2.abrupt('return', assert.equal(result[0].dataValues.inventory.productIdentifer, createdItemId, result.msg));

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        it('Should delete the previously made product', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var result;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return products.deleteProduct(createdItemId);

                        case 2:
                            result = _context3.sent;
                            return _context3.abrupt('return', assert.isTrue(result, "Record could not be deleted.."));

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));
    });
});
//# sourceMappingURL=productJoins.js.map