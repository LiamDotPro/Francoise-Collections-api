'use strict';

module.exports = function (sequelize, DataTypes) {
    var addresses = sequelize.define('addresses', {
        customerId: DataTypes.INTEGER,
        line_1: DataTypes.STRING,
        line_2: DataTypes.STRING,
        line_3: DataTypes.STRING,
        city: DataTypes.STRING,
        town: DataTypes.STRING,
        postCode: DataTypes.STRING,
        county: DataTypes.STRING,
        houseNumber: DataTypes.STRING
    }, {});
    addresses.associate = function (models) {
        // associations can be defined here
    };
    return addresses;
};
//# sourceMappingURL=addresses.js.map