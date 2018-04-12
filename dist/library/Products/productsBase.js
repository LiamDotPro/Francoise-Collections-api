'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

var _InventoriesBase = require('../Inventories/InventoriesBase');

var _InventoriesBase2 = _interopRequireDefault(_InventoriesBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();
// Database Class.

// Products model
var products = _index2.default.product;
var inventories = new _InventoriesBase2.default();

var productsBase = function () {
    function productsBase() {
        _classCallCheck(this, productsBase);

        if (process.env.ENVIROMENT === 'production' && new.target === productsBase) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     * Gets all products from the database.
     */


    _createClass(productsBase, [{
        key: 'getAllProducts',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var allProducts, productList;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return products.findAll();

                            case 3:
                                allProducts = _context.sent;

                                if (!(allProducts.length <= 0)) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', {
                                    msg: 'No products found..',
                                    payload: 1
                                });

                            case 6:
                                productList = allProducts.map(function (item, index, arr) {
                                    return {
                                        product: item.dataValues,
                                        index: index
                                    };
                                });
                                return _context.abrupt('return', {
                                    msg: 'Success',
                                    payload: 0,
                                    productList: productList
                                });

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](0);
                                return _context.abrupt('return', {
                                    msg: 'An error occurred while trying to get the products list',
                                    payload: 1
                                });

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 10]]);
            }));

            function getAllProducts() {
                return _ref.apply(this, arguments);
            }

            return getAllProducts;
        }()

        /**
         * Gets a specific product by it's Unique Identifier.
         * @param id
         */

    }, {
        key: 'getProductById',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                var product;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return products.findAll({
                                    where: {
                                        id: id
                                    }
                                });

                            case 3:
                                product = _context2.sent;

                                if (!(product.length <= 0)) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt('return', {
                                    msg: 'No product was found..',
                                    payload: 1
                                });

                            case 6:
                                return _context2.abrupt('return', { msg: 'Success', payload: 0, product: product[0].dataValues });

                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2['catch'](0);
                                return _context2.abrupt('return', { msg: 'An error occurred while trying to retrieve a product..', payload: 1 });

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 9]]);
            }));

            function getProductById(_x) {
                return _ref2.apply(this, arguments);
            }

            return getProductById;
        }()

        /**
         * Creates a new instance of product.
         *
         * Also creates an instance of inventory.
         *
         * @param name
         * @param description
         * @param thumbnail
         * @param dispatchTime
         * @param status
         * @param eligibleForDiscount
         * @param startSaleDate
         * @param endSaleDate
         */

    }, {
        key: 'createProduct',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name, description, thumbnail, dispatchTime, status, eligibleForDiscount, startSaleDate, endSaleDate) {
                var createdProduct, resultInventory;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return products.create({
                                    productName: name,
                                    productDesc: description,
                                    productThumbnail: thumbnail,
                                    productDispatchTime: dispatchTime,
                                    status: status,
                                    eligibleForDiscount: eligibleForDiscount,
                                    startSale: startSaleDate,
                                    endSale: endSaleDate
                                });

                            case 3:
                                createdProduct = _context3.sent;
                                _context3.next = 6;
                                return inventories.createNewInventory(createdProduct.dataValues.id, 0, 0, 0, 0);

                            case 6:
                                resultInventory = _context3.sent;
                                return _context3.abrupt('return', { msg: 'Success', payload: 0, insertedId: createdProduct.dataValues.id });

                            case 10:
                                _context3.prev = 10;
                                _context3.t0 = _context3['catch'](0);
                                return _context3.abrupt('return', { msg: 'An error occurred while trying to create a new product', payload: 1 });

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 10]]);
            }));

            function createProduct(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
                return _ref3.apply(this, arguments);
            }

            return createProduct;
        }()

        /**
         * Gets a paginated partial view of the products catalog.
         * @todo Needs further testing to assure that pagination works as intended.
         * @param page
         */

    }, {
        key: 'getProductsByPagination',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(page) {
                var count, limit, pages, offset, resultObjects, outputProducts;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return products.findAndCountAll().then(function (data) {
                                    return data.count;
                                });

                            case 3:
                                count = _context4.sent;
                                limit = 50;
                                pages = Math.ceil(count / limit);
                                offset = limit * (page - 1);
                                _context4.next = 9;
                                return products.findAll({
                                    order: [['id', 'DESC']],
                                    limit: limit,
                                    offset: offset
                                });

                            case 9:
                                resultObjects = _context4.sent;

                                if (!(resultObjects.length <= 0)) {
                                    _context4.next = 12;
                                    break;
                                }

                                return _context4.abrupt('return', { msg: 'There was no products found...', payload: 1 });

                            case 12:
                                outputProducts = resultObjects.map(function (item, index) {
                                    return item.dataValues;
                                });
                                return _context4.abrupt('return', {
                                    msg: 'Success',
                                    payload: 0,
                                    pages: pages,
                                    count: count,
                                    products: outputProducts
                                });

                            case 16:
                                _context4.prev = 16;
                                _context4.t0 = _context4['catch'](0);
                                return _context4.abrupt('return', { msg: 'An error occurred while trying get a set of paginated products..', payload: 1 });

                            case 19:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 16]]);
            }));

            function getProductsByPagination(_x10) {
                return _ref4.apply(this, arguments);
            }

            return getProductsByPagination;
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
         * @param startSaleDate
         * @param endSaleDate
         */

    }, {
        key: 'updateProductById',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, name, description, thumbnail, dispatchTime, status, eligibleForDiscount, startSaleDate, endSaleDate) {
                var updatedProduct;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return !!products.update({
                                    productName: name,
                                    productDesc: description,
                                    productThumbnail: thumbnail,
                                    productDispatchTime: dispatchTime,
                                    status: status,
                                    eligibleForDiscount: eligibleForDiscount,
                                    startSale: startSaleDate,
                                    endSale: endSaleDate
                                }, {
                                    where: {
                                        id: id
                                    }
                                });

                            case 3:
                                updatedProduct = _context5.sent;

                                if (updatedProduct) {
                                    _context5.next = 6;
                                    break;
                                }

                                return _context5.abrupt('return', { msg: 'The product was not able to be updated.', payload: 1 });

                            case 6:
                                return _context5.abrupt('return', { msg: 'Success', payload: 0 });

                            case 9:
                                _context5.prev = 9;
                                _context5.t0 = _context5['catch'](0);
                                return _context5.abrupt('return', { msg: 'An error occurred while updating the product information.', payload: 1 });

                            case 12:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 9]]);
            }));

            function updateProductById(_x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19) {
                return _ref5.apply(this, arguments);
            }

            return updateProductById;
        }()

        /**
         * Soft delete a product.
         * @param id
         */

    }, {
        key: 'deleteProduct',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
                var productDestroyResult, inventoryDestory;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (id) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return', { msg: 'No id specified..', payload: 1 });

                            case 2:
                                _context6.prev = 2;
                                _context6.next = 5;
                                return products.destroy({
                                    where: {
                                        id: id
                                    }
                                });

                            case 5:
                                productDestroyResult = !!_context6.sent;

                                if (productDestroyResult) {
                                    _context6.next = 8;
                                    break;
                                }

                                return _context6.abrupt('return', { msg: 'Product could not be deleted', payload: 1 });

                            case 8:
                                _context6.next = 10;
                                return inventories.deleteInventoryByProductId(id);

                            case 10:
                                inventoryDestory = _context6.sent;

                                if (inventoryDestory) {
                                    _context6.next = 13;
                                    break;
                                }

                                return _context6.abrupt('return', { msg: 'Inventory could not be deleted..', payload: 1 });

                            case 13:
                                return _context6.abrupt('return', true);

                            case 16:
                                _context6.prev = 16;
                                _context6.t0 = _context6['catch'](2);
                                return _context6.abrupt('return', false);

                            case 19:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[2, 16]]);
            }));

            function deleteProduct(_x20) {
                return _ref6.apply(this, arguments);
            }

            return deleteProduct;
        }()

        /**
         * Gets Products including a join to inventory
         */

    }, {
        key: 'getProductsWithInventoryAttached',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getProductsWithInventoryAttached() {
                return _ref7.apply(this, arguments);
            }

            return getProductsWithInventoryAttached;
        }()
    }, {
        key: 'uploadProductThumbnail',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function uploadProductThumbnail() {
                return _ref8.apply(this, arguments);
            }

            return uploadProductThumbnail;
        }()
    }, {
        key: 'uploadProductImages',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function uploadProductImages() {
                return _ref9.apply(this, arguments);
            }

            return uploadProductImages;
        }()
    }]);

    return productsBase;
}();

exports.default = productsBase;
//# sourceMappingURL=productsBase.js.map