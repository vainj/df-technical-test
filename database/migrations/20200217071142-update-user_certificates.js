'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.addColumn('user_certificates',
            'token',
            {
                type      : Sequelize.STRING(200),
                allowNull : false,
                unique    : true,
                after     : 'email'
            });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('user_certificates', 'token');
    }
};
