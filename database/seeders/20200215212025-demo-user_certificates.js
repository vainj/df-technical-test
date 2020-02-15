'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_certificates', [{
            first_name : 'Dirty',
            last_name  : 'Gadgette  ',
            email      : 'dirty.gadgette@yopmail.com',
            created_at : new Date(),
            updated_at : new Date()
        }, {
            first_name : 'Papi',
            last_name  : 'Fougasse',
            email      : 'papi.fougasse@yopmail.com',
            created_at : new Date(),
            updated_at : new Date()
        }, {
            first_name : 'Ouai',
            last_name  : 'Ouai',
            email      : 'ouai.ouai@yopmail.com',
            created_at : new Date(),
            updated_at : new Date()
        }], {});
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_certificates', null, {});
    }
};
