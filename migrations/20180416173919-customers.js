'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('customers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            addressId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
            customerName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            customerPhone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            customerEmailAddress: {
                type: Sequelize.STRING,
                allowNull: false
            },
            otherDetails: {
                type: Sequelize.STRING,
                allowNull: true
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
        return queryInterface.dropTable('customers');
    }
};
