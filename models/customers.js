'use strict';
module.exports = (sequelize, DataTypes) => {
    let customers = sequelize.define('customers', {
        customerName: DataTypes.STRING,
        customerPhone: DataTypes.STRING,
        customerEmailAddress: DataTypes.STRING,
        otherDetails: DataTypes.STRING
    }, {});
    customers.associate = function (models) {
        // associations can be defined here
    };
    return customers;
};