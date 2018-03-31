'use strict';
module.exports = (sequelize, DataTypes) => {
  let accounts = sequelize.define('accounts', {
    u_email: DataTypes.STRING,
    u_password: DataTypes.STRING,
    accountType: DataTypes.INTEGER,
    fullname: DataTypes.STRING
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};