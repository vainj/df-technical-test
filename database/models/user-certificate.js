// User certificate
export default (sequelize, DataTypes) => {
    return sequelize.define('UserCertificate', {
        firstName : {
            type : DataTypes.STRING
        },
        lastName  : {
            type : DataTypes.STRING
        },
        email     : {
            type     : DataTypes.STRING,
            validate : {
                isEmail : true
            }
        }
    }, {
        underscored : true,
        tableName   : 'user_certificates'
    })
};