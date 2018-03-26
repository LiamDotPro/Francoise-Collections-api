'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = exports.sequelize = new _sequelize2.default('ecomdb', 'zeus', 'test123', {
    host: '109.237.26.131',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // disable logging; default: console.log
    logging: false
});

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully to postgres.');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

/**
 *  The following can be imported to derive a connection from pooling to be used.
 */
// import {sequelize} from './db/conn';
//# sourceMappingURL=conn.js.map