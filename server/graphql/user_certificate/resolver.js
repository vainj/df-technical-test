export const userCertificateResolver = {
    UserCertificate : {
        fullName : (parent, args, context, info) => `${parent.firstName} ${parent.lastName}`
    },
    Query           : {
        userCertificates : async (parent, args, {db}, info) => db.sequelize.models.UserCertificate.findAll(),
        userCertificate  : async (parent, {id}, {db}, info) => db.sequelize.models.UserCertificate.findByPk(id)
    },
    Mutation        : {
        createUserCertificate : async (parent, {firstName, lastName, email}, {db}, info) =>
            db.sequelize.models.UserCertificate.create({
                firstName : firstName,
                lastName  : lastName,
                email     : email
            }),
        updateUserCertificate : async (parent, {firstName, lastName, email, id}, {db}, info) =>
            db.sequelize.models.UserCertificate.update({
                    firstName : firstName,
                    lastName  : lastName,
                    email     : email
                },
                {
                    where : {
                        id : id
                    }
                })
    }
};