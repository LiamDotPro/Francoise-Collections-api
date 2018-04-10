'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Inventories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productIdentifer: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
            available: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            sold: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            hold: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            onOrder: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        return queryInterface.dropTable('Inventories');
    }
};