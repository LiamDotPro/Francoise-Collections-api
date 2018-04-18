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
var address = _index2.default.addresses;

var AddressesBase = function () {
    function AddressesBase() {
        _classCallCheck(this, AddressesBase);
    }

    _createClass(AddressesBase, [{
        key: 'createAddressRecord',


        /**
         * Creates a new address record for a customer.
         * @param customerId
         * @param line_1
         * @param line_2
         * @param line_3
         * @param city
         * @param town
         * @param postCode
         * @param county
         * @param houseNumber
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(customerId, line_1, line_2, line_3, city, town, postCode, county, houseNumber) {
                var createdAddress;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(isNaN(customerId) && !customerId)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', { msg: 'No product Identifier was passed.', payload: 1 });

                            case 2:
                                _context.prev = 2;
                                _context.next = 5;
                                return address.create({
                                    customerId: customerId,
                                    line_1: line_1,
                                    line_2: line_2,
                                    line_3: line_3,
                                    city: city,
                                    town: town,
                                    postCode: postCode,
                                    county: county,
                                    houseNumber: houseNumber
                                });

                            case 5:
                                createdAddress = _context.sent;
                                return _context.abrupt('return', { msg: 'Success', payload: 0, insertedId: createdAddress.dataValues.id });

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

            function createAddressRecord(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
                return _ref.apply(this, arguments);
            }

            return createAddressRecord;
        }()

        /**
         * Gets an address record using an id.
         * @param id
         */

    }, {
        key: 'getAddressById',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                var foundAddress;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (id) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', { msg: 'No id specified..', payload: 1 });

                            case 2:
                                _context2.prev = 2;
                                _context2.next = 5;
                                return address.findAll({
                                    where: {
                                        id: id
                                    }
                                });

                            case 5:
                                foundAddress = _context2.sent;

                                if (!(foundAddress.length <= 0)) {
                                    _context2.next = 8;
                                    break;
                                }

                                return _context2.abrupt('return', { msg: 'No address record was found..', payload: 1 });

                            case 8:
                                return _context2.abrupt('return', { msg: 'Success', payload: 0, address: foundAddress[0].dataValues });

                            case 11:
                                _context2.prev = 11;
                                _context2.t0 = _context2['catch'](2);
                                return _context2.abrupt('return', { msg: 'An error occurred while trying to retrieve a address..', payload: 1 });

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 11]]);
            }));

            function getAddressById(_x10) {
                return _ref2.apply(this, arguments);
            }

            return getAddressById;
        }()

        /**
         * Gets all avalible address records.
         */

    }, {
        key: 'getAllAddresses',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var allAddresses, addressList;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return address.findAll();

                            case 3:
                                allAddresses = _context3.sent;

                                if (!(allAddresses.length <= 0)) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt('return', {
                                    msg: 'No addresses found..',
                                    payload: 1
                                });

                            case 6:
                                addressList = allAddresses.map(function (item, index, arr) {
                                    return {
                                        address: item.dataValues,
                                        index: index
                                    };
                                });
                                return _context3.abrupt('return', {
                                    msg: 'Success',
                                    payload: 0,
                                    addressList: addressList
                                });

                            case 10:
                                _context3.prev = 10;
                                _context3.t0 = _context3['catch'](0);
                                return _context3.abrupt('return', {
                                    msg: 'An error occurred while trying to get the address list.',
                                    payload: 1
                                });

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 10]]);
            }));

            function getAllAddresses() {
                return _ref3.apply(this, arguments);
            }

            return getAllAddresses;
        }()

        /**
         * Updates an address using an id.
         * @param id
         * @param line_1
         * @param line_2
         * @param line_3
         * @param city
         * @param town
         * @param postCode
         * @param county
         * @param houseNumber
         */

    }, {
        key: 'updateAddressById',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, line_1, line_2, line_3, city, town, postCode, county, houseNumber) {
                var updatedAddress;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return address.update({
                                    line_1: line_1,
                                    line_2: line_2,
                                    line_3: line_3,
                                    city: city,
                                    town: town,
                                    postCode: postCode,
                                    county: county,
                                    houseNumber: houseNumber
                                }, {
                                    where: {
                                        id: id
                                    }
                                });

                            case 3:
                                updatedAddress = _context4.sent;
                                return _context4.abrupt('return', { msg: 'Success', payload: 0 });

                            case 7:
                                _context4.prev = 7;
                                _context4.t0 = _context4['catch'](0);
                                return _context4.abrupt('return', { msg: 'An error occurred while updating the inventory information.', payload: 1 });

                            case 10:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 7]]);
            }));

            function updateAddressById(_x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19) {
                return _ref4.apply(this, arguments);
            }

            return updateAddressById;
        }()

        /***
         * delete's an address using an id.
         * @param id
         */

    }, {
        key: 'deleteAddress',
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

                                return _context5.abrupt('return', { msg: 'No id was specified..', payload: 1 });

                            case 2:
                                _context5.prev = 2;
                                _context5.next = 5;
                                return address.destroy({
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

            function deleteAddress(_x20) {
                return _ref5.apply(this, arguments);
            }

            return deleteAddress;
        }()
    }]);

    return AddressesBase;
}();

exports.default = AddressesBase;
//# sourceMappingURL=AddressesBase.js.map