'use strict';

require('babel-polyfill');

var _InventoriesBase = require('../library/Inventories/InventoriesBase');

var _InventoriesBase2 = _interopRequireDefault(_InventoriesBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();


var assert = require('chai').assert;

var inventories = new _InventoriesBase2.default();

describe('Inventories', function () {

        describe('Inventories Library', function () {

                var createdId = null;

                it('Should create a new inventory using the fake product number 0', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                        switch (_context.prev = _context.next) {
                                                case 0:
                                                        _context.next = 2;
                                                        return inventories.createNewInventory(1, 10, 0, 0, 0);

                                                case 2:
                                                        result = _context.sent;


                                                        if (result.hasOwnProperty('insertedId')) {
                                                                createdId = result.insertedId;
                                                        }

                                                        return _context.abrupt('return', assert.equal(result.payload, 0, result.msg));

                                                case 5:
                                                case 'end':
                                                        return _context.stop();
                                        }
                                }
                        }, _callee, undefined);
                })));

                it('Should update the product that was just created (By productId) - +10 stock', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                        switch (_context2.prev = _context2.next) {
                                                case 0:
                                                        _context2.next = 2;
                                                        return inventories.updateInventoryByProductId(1, 19, 1, 0, 0);

                                                case 2:
                                                        result = _context2.sent;
                                                        return _context2.abrupt('return', assert.equal(result.payload, 0, result.msg));

                                                case 4:
                                                case 'end':
                                                        return _context2.stop();
                                        }
                                }
                        }, _callee2, undefined);
                })));

                it('Should get all available Inventories', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                        switch (_context3.prev = _context3.next) {
                                                case 0:
                                                        _context3.next = 2;
                                                        return inventories.getAllInventories();

                                                case 2:
                                                        result = _context3.sent;
                                                        return _context3.abrupt('return', assert.isAbove(result.inventoryList.length, 0, result.msg));

                                                case 4:
                                                case 'end':
                                                        return _context3.stop();
                                        }
                                }
                        }, _callee3, undefined);
                })));

                it('Should get an inventory using a specific id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                        switch (_context4.prev = _context4.next) {
                                                case 0:
                                                        _context4.next = 2;
                                                        return inventories.getInventoryById(createdId);

                                                case 2:
                                                        result = _context4.sent;
                                                        return _context4.abrupt('return', assert.isTrue(result.hasOwnProperty('inventory'), result.msg));

                                                case 4:
                                                case 'end':
                                                        return _context4.stop();
                                        }
                                }
                        }, _callee4, undefined);
                })));

                it('Should get an inventory using a specific product id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                        switch (_context5.prev = _context5.next) {
                                                case 0:
                                                        _context5.next = 2;
                                                        return inventories.getInventoryByProductId(1);

                                                case 2:
                                                        result = _context5.sent;
                                                        return _context5.abrupt('return', assert.isTrue(result.hasOwnProperty('inventory'), result.msg));

                                                case 4:
                                                case 'end':
                                                        return _context5.stop();
                                        }
                                }
                        }, _callee5, undefined);
                })));

                it('Should update the product that was just created (By id) - -1 stock', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                while (1) {
                                        switch (_context6.prev = _context6.next) {
                                                case 0:
                                                        _context6.next = 2;
                                                        return inventories.updateInventoryById(createdId, 1, 9, 1, 0, 0);

                                                case 2:
                                                        result = _context6.sent;
                                                        return _context6.abrupt('return', assert.equal(result.payload, 0, result.msg));

                                                case 4:
                                                case 'end':
                                                        return _context6.stop();
                                        }
                                }
                        }, _callee6, undefined);
                })));

                it('Should get the inventory using a join from the product table', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                while (1) {
                                        switch (_context7.prev = _context7.next) {
                                                case 0:
                                                case 'end':
                                                        return _context7.stop();
                                        }
                                }
                        }, _callee7, undefined);
                })));

                it('Should delete the newly created inventory', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                        var result;
                        return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                while (1) {
                                        switch (_context8.prev = _context8.next) {
                                                case 0:
                                                        _context8.next = 2;
                                                        return inventories.deleteInventoryById(createdId);

                                                case 2:
                                                        result = _context8.sent;
                                                        return _context8.abrupt('return', assert.isTrue(result, result.msg));

                                                case 4:
                                                case 'end':
                                                        return _context8.stop();
                                        }
                                }
                        }, _callee8, undefined);
                })));
        });
});
//# sourceMappingURL=inventories.js.map