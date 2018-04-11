'use strict';
module.exports = (sequelize, DataTypes) => {
    let product = sequelize.define('product', {
        productName: DataTypes.STRING,
        productDesc: DataTypes.STRING,
        productThumbnail: DataTypes.STRING,
        productDispatchTime: DataTypes.STRING,
        startSale: DataTypes.DATEONLY,
        endSale: DataTypes.DATEONLY,
        status: DataTypes.INTEGER,
        eligibleForDiscount: DataTypes.BOOLEAN
    }, {});
    product.associate = function (models) {
        // associations can be defined here
    };
    return product;
};