'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('customers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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

    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('customers');
    }
};
//# sourceMappingURL=20180416173919-customers.js.map