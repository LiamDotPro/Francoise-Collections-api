require('dotenv').config();

import mysql from 'promise-mysql';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'default',
    password: 'test123',
    database: 'influencer_api',
    connectionLimit: 10
});

export default function getSqlConnection() {
    return pool.getConnection().disposer(function (connection) {
        pool.releaseConnection(connection);
    });
}