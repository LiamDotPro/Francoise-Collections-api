'use strict';

module.exports = function (sequelize, DataTypes) {
  var inventory = sequelize.define('inventory', {
    productIdentifer: DataTypes.INTEGER,
    available: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    hold: DataTypes.INTEGER,
    onOrder: DataTypes.INTEGER
  }, {});
  inventory.associate = function (models) {
    // associations can be defined here
  };
  return inventory;
};
//# sourceMappingURL=inventory.js.map