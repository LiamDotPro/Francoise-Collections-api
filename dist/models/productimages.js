'use strict';

module.exports = function (sequelize, DataTypes) {
    var productImages = sequelize.define('productImages', {
        imageLink: DataTypes.STRING,
        productId: DataTypes.INTEGER
    }, {});
    productImages.associate = function (models) {
        // associations can be defined here

    };
    return productImages;
};
//# sourceMappingURL=productimages.js.map