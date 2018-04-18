'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var customers = _index2.default.customers;

var CustomersBase = function () {
    function CustomersBase() {
        _classCallCheck(this, CustomersBase);
    }

    _createClass(CustomersBase, [{
        key: 'createCustomer',


        /**
         * Create a new customer.
         *
         * Address parameter is created by AddressBase
         * @param customerName
         * @param customerPhone
         * @param customerEmailAddress
         * @param otherDetails
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(customerName, customerPhone, customerEmailAddress, otherDetails) {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(!customerName || !customerPhone || !customerEmailAddress)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', { msg: 'There was an error with the customer information supplied.', payload: 1 });

                            case 2:
                                _context.prev = 2;
                                _context.next = 5;
                                return customers.create({
                                    addressId: 0,
                                    customerName: customerName,
                                    customerPhone: customerPhone,
                                    customerEmailAddress: customerEmailAddress,
                                    otherDetails: otherDetails
                                });

                            case 5:
                                result = _context.sent;
                                return _context.abrupt('return', { msg: 'Success', payload: 0, insertedId: result.dataValues.id });

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](2);
                                return _context.abrupt('return', { msg: 'An error occurred while trying to create a new customer', payload: 1 });

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 9]]);
            }));

            function createCustomer(_x, _x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            }

            return createCustomer;
        }()

        /**
         * Gets a customer using an id.
         * @param id
         */

    }, {
        key: 'getCustomerById',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                var result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (id) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', { msg: 'No id was specified.', payload: 1 });

                            case 2:
                                _context2.next = 4;
                                return customers.findById(id);

                            case 4:
                                result = _context2.sent;

                                if (!!result) {
                                    _context2.next = 7;
                                    break;
                                }

                                return _context2.abrupt('return', { msg: 'No customer was found with that id..', customer: { id: null }, payload: 1 });

                            case 7:
                                return _context2.abrupt('return', { msg: 'Success', payload: 0, customer: result.dataValues });

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getCustomerById(_x5) {
                return _ref2.apply(this, arguments);
            }

            return getCustomerById;
        }()

        /**
         * Gets a list of all customers.
         */

    }, {
        key: 'getAllCustomers',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var allCustomers, customerList;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return customers.findAll();

                            case 3:
                                allCustomers = _context3.sent;

                                if (!(allCustomers.length <= 0)) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt('return', {
                                    msg: 'No customers found..',
                                    payload: 1
                                });

                            case 6:
                                customerList = allCustomers.map(function (item, index, arr) {
                                    return {
                                        inventory: item.dataValues,
                                        index: index
                                    };
                                });
                                return _context3.abrupt('return', {
                                    msg: 'Success',
                                    payload: 0,
                                    customerList: customerList
                                });

                            case 10:
                                _context3.prev = 10;
                                _context3.t0 = _context3['catch'](0);
                                return _context3.abrupt('return', {
                                    msg: 'An error occurred while trying to get the customer list',
                                    payload: 1
                                });

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 10]]);
            }));

            function getAllCustomers() {
                return _ref3.apply(this, arguments);
            }

            return getAllCustomers;
        }()

        /**
         * Updates a customer.
         * @param customerName
         * @param customerPhone
         * @param customerEmailAddress
         * @param otherDetails
         * @param id
         */

    }, {
        key: 'updateCustomerById',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, customerName, customerPhone, customerEmailAddress, otherDetails) {
                var updatedCustomer;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return customers.update({
                                    customerName: customerName,
                                    customerPhone: customerPhone,
                                    customerEmailAddress: customerEmailAddress,
                                    otherDetails: otherDetails
                                }, {
                                    where: {
                                        id: id
                                    }
                                });

                            case 3:
                                updatedCustomer = _context4.sent;
                                return _context4.abrupt('return', { msg: 'Success', payload: 0 });

                            case 7:
                                _context4.prev = 7;
                                _context4.t0 = _context4['catch'](0);

                                console.log(_context4.t0);
                                return _context4.abrupt('return', { msg: 'An error occurred while updating the inventory information.', payload: 1 });

                            case 11:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 7]]);
            }));

            function updateCustomerById(_x6, _x7, _x8, _x9, _x10) {
                return _ref4.apply(this, arguments);
            }

            return updateCustomerById;
        }()

        /**
         * Delete's a customer using an id.
         * @param id
         */

    }, {
        key: 'deleteCustomerById',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (id) {
                                    _context5.next = 2;
                                    break;
                                }

                                return _context5.abrupt('return', { msg: 'No id was specified.', payload: 1 });

                            case 2:
                                _context5.prev = 2;
                                _context5.next = 5;
                                return customers.destroy({
                                    where: {
                                        id: id
                                    }
                                });

                            case 5:
                                return _context5.abrupt('return', !!_context5.sent);

                            case 8:
                                _context5.prev = 8;
                                _context5.t0 = _context5['catch'](2);
                                return _context5.abrupt('return', false);

                            case 11:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[2, 8]]);
            }));

            function deleteCustomerById(_x11) {
                return _ref5.apply(this, arguments);
            }

            return deleteCustomerById;
        }()
    }]);

    return CustomersBase;
}();

exports.default = CustomersBase;
//# sourceMappingURL=CustomersBase.js.map