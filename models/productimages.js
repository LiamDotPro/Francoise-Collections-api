'use strict';
module.exports = (sequelize, DataTypes) => {
    let productImages = sequelize.define('productImages', {
        imageLink: DataTypes.STRING,
        productId: DataTypes.INTEGER
    }, {});
    productImages.associate = function (models) {
        // associations can be defined here

    };
    return productImages;
};