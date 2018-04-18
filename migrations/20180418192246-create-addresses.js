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
            line_1: {
                type: Sequelize.STRING
            },
            line_2: {
                type: Sequelize.STRING
            },
            line_3: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            town: {
                type: Sequelize.STRING
            },
            postCode: {
                type: Sequelize.STRING
            },
            county: {
                type: Sequelize.STRING
            },
            houseNumber: {
                type: Sequelize.STRING
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