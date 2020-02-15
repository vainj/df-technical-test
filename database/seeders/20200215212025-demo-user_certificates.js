'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_certificates', [{
            first_name : 'John',
            last_name  : 'Doe',
            email      : 'john.doe@yopmail.com',
            created_at : new Date(),
            updated_at : new Date()
        }], {});
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_certificates', null, {});
    }
};
