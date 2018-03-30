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
var products = _index2.default.products;

var productsBase = function () {
    function productsBase() {
        _classCallCheck(this, productsBase);

        if (process.env.ENVIROMENT === 'production' && new.target === productsBase) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     * Gets all products from the database.
     * @returns {Promise<void>}
     */


    _createClass(productsBase, [{
        key: 'getAllProducts',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getAllProducts() {
                return _ref.apply(this, arguments);
            }

            return getAllProducts;
        }()

        /**
         * Gets a specific product by it's Unique Identifier.
         * @returns {Promise<void>}
         */

    }, {
        key: 'getProductById',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getProductById() {
                return _ref2.apply(this, arguments);
            }

            return getProductById;
        }()

        /**
         * Creates a new instance of product.
         * @param name
         * @param description
         * @param thumbnail
         * @param dispatchTime
         * @param status
         * @param eligibleForDiscount
         * @param productInventory
         * @param startSaleDate
         * @param endSaleDate
         * @returns {Promise<void>}
         */

    }, {
        key: 'createProduct',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name, description, thumbnail, dispatchTime, status, eligibleForDiscount, productInventory, startSaleDate, endSaleDate) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function createProduct(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
                return _ref3.apply(this, arguments);
            }

            return createProduct;
        }()

        /**
         * Update information about a product.
         * @param id
         * @param name
         * @param description
         * @param thumbnail
         * @param dispatchTime
         * @param status
         * @param eligibleForDiscount
         * @param productInventory
         * @param startSaleDate
         * @param endSaleDate
         * @returns {Promise<void>}
         */

    }, {
        key: 'updateProductById',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, name, description, thumbnail, dispatchTime, status, eligibleForDiscount, productInventory, startSaleDate, endSaleDate) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function updateProductById(_x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19) {
                return _ref4.apply(this, arguments);
            }

            return updateProductById;
        }()

        /**
         * Soft delete a product.
         * @param id
         * @returns {Promise<void>}
         */

    }, {
        key: 'deleteProduct',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function deleteProduct(_x20) {
                return _ref5.apply(this, arguments);
            }

            return deleteProduct;
        }()
    }]);

    return productsBase;
}();

exports.default = productsBase;
//# sourceMappingURL=productsBase.js.map