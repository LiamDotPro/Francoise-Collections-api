'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _authentication = require('../Accounts/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();
var auth = new _authentication2.default();

var ConfiguredPassport = function () {
    function ConfiguredPassport() {
        _classCallCheck(this, ConfiguredPassport);

        this.passport = _passport2.default;
    }

    _createClass(ConfiguredPassport, [{
        key: 'configurePassport',
        value: function configurePassport() {
            // Passport Data
            var ExtractJwt = _passportJwt2.default.ExtractJwt;
            var JwtStrategy = _passportJwt2.default.Strategy;

            var jwtOptions = {};
            jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
            jwtOptions.secretOrKey = process.env.JWT_SECRET;

            var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
                auth.findAccountById(jwt_payload.id).then(function (res) {
                    if (res.msg === 'success') {
                        next(null, jwt_payload.id);
                    } else {
                        next(null, false);
                    }
                });
            });

            var adminStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
                auth.findAccountById(jwt_payload.id).then(function (res) {
                    if (res.msg === 'success') {
                        next(null, jwt_payload.id);
                    } else {
                        next(null, false);
                    }
                });
            });

            this.passport.use('jwt', strategy);
            this.passport.use('admin', adminStrategy);
        }
    }]);

    return ConfiguredPassport;
}();

exports.default = ConfiguredPassport;
//# sourceMappingURL=Passport.js.map