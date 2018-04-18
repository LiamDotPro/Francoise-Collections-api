'use strict';
module.exports = (sequelize, DataTypes) => {
    let addresses = sequelize.define('addresses', {
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