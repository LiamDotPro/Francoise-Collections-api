require('dotenv').config();

import mysql from 'promise-mysql';

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: 'ecomDB',
    connectionLimit: 10
});

export default function getSqlConnection() {
    return pool.getConnection().disposer(function (connection) {
        pool.releaseConnection(connection);
    });
}