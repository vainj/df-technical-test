'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_certificates', {
            id         : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            first_name : {
                type      : Sequelize.STRING(50),
                allowNull : false
            },
            last_name  : {
                type      : Sequelize.STRING(50),
                allowNull : false
            },
            email      : {
                type      : Sequelize.STRING(100),
                allowNull : false,
                unique    : true
            },
            created_at : {
                allowNull : false,
                type      : Sequelize.DATE
            },
            updated_at : {
                allowNull : false,
                type      : Sequelize.DATE
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_certificates');
    }
};