export const resolver = {
    UserCertificate : {
        fullName : (parent, args, context, info) => `${parent.firstName} ${parent.lastName}`
    },
    Query           : {
        userCertificates       : async (parent, args, {dbModels}, info) =>
            dbModels.UserCertificate.findAll(),
        userCertificate        : async (parent, {id}, {dbModels}, info) =>
            dbModels.UserCertificate.findByPk(id),
        userCertificateByEmail : async (parent, {email}, {dbModels}, info) =>
            dbModels.UserCertificate.findOne({
                where : {
                    email : email
                }
            })
    },
    Mutation        : {
        createUserCertificate : async (parent, {firstName, lastName, email, token}, {dbModels}, info) =>
            dbModels.UserCertificate.create({
                firstName : firstName,
                lastName  : lastName,
                email     : email,
                token     : token
            }),
        updateUserCertificate : async (parent, {id, firstName, lastName, email, token}, {dbModels}, info) =>
            dbModels.UserCertificate.update({
                    firstName : firstName,
                    lastName  : lastName,
                    email     : email,
                    token     : token
                },
                {
                    where : {
                        id : id
                    }
                })
    }
};