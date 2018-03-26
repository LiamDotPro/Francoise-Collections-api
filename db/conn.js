import Sequelize from 'sequelize';

export let sequelize = new Sequelize(
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
        }
    });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// The following can be imported to derive a connection from pooling to be used.
// import {sequelize} from './db/conn';