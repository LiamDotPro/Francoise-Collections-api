'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('addresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customerId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            line_1: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            line_2: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            line_3: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            town: {
                type: Sequelize.STRING
            },
            postCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            county: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            houseNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('addresses');
    }
};