'use strict';

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();


// Include files to test here.

var assert = require('chai').assert;

describe('Blank Test Suite', function () {
    describe('Default Test', function () {

        it('should run the default test', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            assert.equal([1, 2, 3].indexOf(4), -1);

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));
    });
});
//# sourceMappingURL=exampleTest.js.map