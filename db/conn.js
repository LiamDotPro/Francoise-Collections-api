import Sequelize from 'sequelize';

export let connection = new Sequelize(
    'ecomdb',
    'zeus',
    'test123',
    {
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

connection.authenticate().then(() => {
    console.log('Connection has been established successfully to postgres.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

/**
 *  The following can be imported to derive a connection from pooling to be used.
 */
// import {connection} from './db/conn';