'use strict';

module.exports = function (sequelize, DataTypes) {
    var customers = sequelize.define('customers', {
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
//# sourceMappingURL=customers.js.map