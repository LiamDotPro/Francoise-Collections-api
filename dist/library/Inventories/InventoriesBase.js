'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();
// Database Class.

// Products model
var inventories = _index2.default.inventory;

var InventoriesBase = function () {
    function InventoriesBase() {
        _classCallCheck(this, InventoriesBase);
    }

    _createClass(InventoriesBase, [{
        key: 'createNewInventory',


        /**
         * Creates a new instance of inventory.
         * @param productIdentifer
         * @param available
         * @param sold
         * @param hold
         * @param onOrder
         * @returns {Promise.<*>}
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(productIdentifer, available, sold, hold, onOrder) {
                var createdInventory;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!isNaN(productIdentifer)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', { msg: 'No product Identifier was passed.', payload: 1 });

                            case 2:
                                _context.prev = 2;
                                _context.next = 5;
                                return inventories.create({
                                    productIdentifer: productIdentifer,
                                    available: available,
                                    sold: sold,
                                    hold: hold,
                                    onOrder: onOrder
                                });

                            case 5:
                                createdInventory = _context.sent;
                                return _context.abrupt('return', { msg: 'Success', payload: 0, insertedId: createdInventory.dataValues.id });

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](2);
                                return _context.abrupt('return', { msg: 'An error occurred while trying to create a new inventory', payload: 1 });

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 9]]);
            }));

            function createNewInventory(_x, _x2, _x3, _x4, _x5) {
                return _ref.apply(this, arguments);
            }

            return createNewInventory;
        }()

        /**
         * Updates an inventory using an id.
         * @param id
         * @param productIdentifer
         * @param available
         * @param sold
         * @param hold
         * @param onOrder
         */

    }, {
        key: 'updateInventoryById',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, productIdentifer, available, sold, hold, onOrder) {
                var updatedInventory;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return !!inventories.update({
                                    productIdentifer: productIdentifer,
                                    available: available,
                                    sold: sold,
                                    hold: hold,
                                    onOrder: onOrder
                                }, {
                                    where: {
                                        id: id
                                    }
                                });

                            case 3:
                                updatedInventory = _context2.sent;

                                if (updatedInventory) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt('return', { msg: 'The inventory was not able to be updated...', payload: 1 });

                            case 6:
                                return _context2.abrupt('return', { msg: 'Success', payload: 0 });

                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2['catch'](0);
                                return _context2.abrupt('return', { msg: 'An error occurred while updating the inventory information.', payload: 1 });

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 9]]);
            }));

            function updateInventoryById(_x6, _x7, _x8, _x9, _x10, _x11) {
                return _ref2.apply(this, arguments);
            }

            return updateInventoryById;
        }()

        /**
         * Updates an inventory using a productId.
         * @param productIdentifer
         * @param available
         * @param sold
         * @param hold
         * @param onOrder
         */

    }, {
        key: 'updateInventoryByProductId',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(productIdentifer, available, sold, hold, onOrder) {
                var updatedInventory;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return inventories.update({
                                    available: available,
                                    sold: sold,
                                    hold: hold,
                                    onOrder: onOrder
                                }, {
                                    where: {
                                        productIdentifer: productIdentifer
                                    }
                                });

                            case 3:
                                updatedInventory = _context3.sent;
                                return _context3.abrupt('return', { msg: 'Success', payload: 0 });

                            case 7:
                                _context3.prev = 7;
                                _context3.t0 = _context3['catch'](0);
                                return _context3.abrupt('return', { msg: 'An error occurred while updating the inventory information.', payload: 1 });

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 7]]);
            }));

            function updateInventoryByProductId(_x12, _x13, _x14, _x15, _x16) {
                return _ref3.apply(this, arguments);
            }

            return updateInventoryByProductId;
        }()

        /**
         * Gets all of the available inventory listings.
         */

    }, {
        key: 'getAllInventories',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var allInventories, inventoryList;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return inventories.findAll();

                            case 3:
                                allInventories = _context4.sent;

                                if (!(allInventories.length <= 0)) {
                                    _context4.next = 6;
                                    break;
                                }

                                return _context4.abrupt('return', {
                                    msg: 'No inventories found..',
                                    payload: 1
                                });

                            case 6:
                                inventoryList = allInventories.map(function (item, index, arr) {
                                    return {
                                        inventory: item.dataValues,
                                        index: index
                                    };
                                });
                                return _context4.abrupt('return', {
                                    msg: 'Success',
                                    payload: 0,
                                    inventoryList: inventoryList
                                });

                            case 10:
                                _context4.prev = 10;
                                _context4.t0 = _context4['catch'](0);
                                return _context4.abrupt('return', {
                                    msg: 'An error occurred while trying to get the inventory list',
                                    payload: 1
                                });

                            case 13:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 10]]);
            }));

            function getAllInventories() {
                return _ref4.apply(this, arguments);
            }

            return getAllInventories;
        }()

        /**
         * Gets an inventory using id.
         * @param id
         */

    }, {
        key: 'getInventoryById',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
                var inventory;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (id) {
                                    _context5.next = 2;
                                    break;
                                }

                                return _context5.abrupt('return', { msg: 'No id specified..', payload: 1 });

                            case 2:
                                _context5.prev = 2;
                                _context5.next = 5;
                                return inventories.findAll({
                                    where: {
                                        id: id
                                    }
                                });

                            case 5:
                                inventory = _context5.sent;

                                if (!(inventory.length <= 0)) {
                                    _context5.next = 8;
                                    break;
                                }

                                return _context5.abrupt('return', { msg: 'No inventory was found..', payload: 1 });

                            case 8:
                                return _context5.abrupt('return', { msg: 'Success', payload: 0, inventory: inventory[0].dataValues });

                            case 11:
                                _context5.prev = 11;
                                _context5.t0 = _context5['catch'](2);
                                return _context5.abrupt('return', { msg: 'An error occurred while trying to retrieve a inventory..', payload: 1 });

                            case 14:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[2, 11]]);
            }));

            function getInventoryById(_x17) {
                return _ref5.apply(this, arguments);
            }

            return getInventoryById;
        }()

        /**
         * Gets an inventory using the product Id.
         * @param productId
         */

    }, {
        key: 'getInventoryByProductId',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(productId) {
                var inventory;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (productId) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return', { msg: 'No product id specified..', payload: 1 });

                            case 2:
                                _context6.prev = 2;
                                _context6.next = 5;
                                return inventories.findAll({
                                    where: {
                                        productIdentifer: productId
                                    }
                                });

                            case 5:
                                inventory = _context6.sent;

                                if (!(inventory.length <= 0)) {
                                    _context6.next = 8;
                                    break;
                                }

                                return _context6.abrupt('return', { msg: 'No inventory was found..', payload: 1 });

                            case 8:
                                return _context6.abrupt('return', { msg: 'Success', payload: 0, inventory: inventory[0].dataValues });

                            case 11:
                                _context6.prev = 11;
                                _context6.t0 = _context6['catch'](2);
                                return _context6.abrupt('return', { msg: 'An error occurred while trying to retrieve a inventory..', payload: 1 });

                            case 14:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[2, 11]]);
            }));

            function getInventoryByProductId(_x18) {
                return _ref6.apply(this, arguments);
            }

            return getInventoryByProductId;
        }()

        /**
         * Deletes an inventory based on Id.
         * @param id
         */

    }, {
        key: 'deleteInventoryById',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (id) {
                                    _context7.next = 2;
                                    break;
                                }

                                return _context7.abrupt('return', { msg: 'No id specified..', payload: 1 });

                            case 2:
                                _context7.prev = 2;
                                _context7.next = 5;
                                return inventories.destroy({
                                    where: {
                                        id: id
                                    }
                                });

                            case 5:
                                return _context7.abrupt('return', !!_context7.sent);

                            case 8:
                                _context7.prev = 8;
                                _context7.t0 = _context7['catch'](2);
                                return _context7.abrupt('return', false);

                            case 11:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[2, 8]]);
            }));

            function deleteInventoryById(_x19) {
                return _ref7.apply(this, arguments);
            }

            return deleteInventoryById;
        }()

        /**
         * Deletes an inventory based on product Id.
         * @param productId
         */

    }, {
        key: 'deleteInventoryByProductId',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(productId) {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (productId) {
                                    _context8.next = 2;
                                    break;
                                }

                                return _context8.abrupt('return', { msg: 'No product identifier specified..', payload: 1 });

                            case 2:
                                _context8.prev = 2;
                                _context8.next = 5;
                                return inventories.destroy({
                                    where: {
                                        productIdentifer: productId
                                    }
                                });

                            case 5:
                                return _context8.abrupt('return', !!_context8.sent);

                            case 8:
                                _context8.prev = 8;
                                _context8.t0 = _context8['catch'](2);
                                return _context8.abrupt('return', false);

                            case 11:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[2, 8]]);
            }));

            function deleteInventoryByProductId(_x20) {
                return _ref8.apply(this, arguments);
            }

            return deleteInventoryByProductId;
        }()
    }]);

    return InventoriesBase;
}();

exports.default = InventoriesBase;
//# sourceMappingURL=InventoriesBase.js.map