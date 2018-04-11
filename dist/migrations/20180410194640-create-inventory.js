'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('inventories', {
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
    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('inventories');
    }
};
//# sourceMappingURL=20180410194640-create-inventory.js.map