'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getSqlConnection;

var _promiseMysql = require('promise-mysql');

var _promiseMysql2 = _interopRequireDefault(_promiseMysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var pool = _promiseMysql2.default.createPool({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: 'ecomDB',
    connectionLimit: 10
});

function getSqlConnection() {
    return pool.getConnection().disposer(function (connection) {
        pool.releaseConnection(connection);
    });
}
//# sourceMappingURL=db.js.map