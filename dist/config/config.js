"use strict";

var Sequelize = require("sequelize");

module.exports = {
    development: {
        username: "postgres",
        password: "!`5L:~5SCk!x3rgg",
        database: "database_development",
        host: "109.237.26.131",
        dialect: "postgres",
        operatorsAliases: Sequelize.Op,
        logging: false
    },
    test: {
        username: "postgres",
        password: "!`5L:~5SCk!x3rgg",
        database: "database_test",
        host: "109.237.26.131",
        logging: false,
        operatorsAliases: Sequelize.Op,
        dialect: "postgres"
    },
    production: {
        username: "postgres",
        password: "!`5L:~5SCk!x3rgg",
        database: "database_production",
        host: "109.237.26.131",
        logging: false,
        operatorsAliases: Sequelize.Op,
        dialect: "postgres"
    }
};
//# sourceMappingURL=config.js.map