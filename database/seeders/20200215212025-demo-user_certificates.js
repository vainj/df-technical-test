'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_certificates', [{
            first_name : 'Dirty',
            last_name  : 'Gadgette  ',
            email      : 'dirty.gadgette@yopmail.com',
            token      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4MTkyMzE5NywiZXhwIjoxNTgxOTIzMTk5fQ.tS9m74sbUTrLMm0_zBjnK_Wn6EFkj7QT4s25vRI3lVs',
            created_at : new Date(),
            updated_at : new Date()
        }, {
            first_name : 'Papi',
            last_name  : 'Fougasse',
            email      : 'papi.fougasse@yopmail.com',
            token      : 'dddhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4MTkyMzE5NywiZXhwIjoxNTgxOTIzMTk5fQ.tS9m74sbUTrLMm0_zBjnK_Wn6EFkj7QT4s25vRI3lVs',
            created_at : new Date(),
            updated_at : new Date()
        }, {
            first_name : 'Ouai',
            last_name  : 'Ouai',
            email      : 'ouai.ouai@yopmail.com',
            token      : 'xdahbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4MTkyMzE5NywiZXhwIjoxNTgxOTIzMTk5fQ.tS9m74sbUTrLMm0_zBjnK_Wn6EFkj7QT4s25vRI3lVs',
            created_at : new Date(),
            updated_at : new Date()
        }], {});
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_certificates', null, {});
    }
};
