'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.addColumn('user_certificates',
            'token',
            {
                type      : Sequelize.STRING(255),
                allowNull : false,
                unique    : true
            });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('user_certificates', 'token');
    }
};
