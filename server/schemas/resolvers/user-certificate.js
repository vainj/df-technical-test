export const resolver = {
    UserCertificate : {
        fullName : (parent, args, context, info) => `${parent.firstName} ${parent.lastName}`
    },
    Query           : {
        userCertificates : async (parent, args, {dbModels}, info) => dbModels.UserCertificate.findAll(),
        userCertificate  : async (parent, {id}, {dbModels}, info) => dbModels.UserCertificate.findByPk(id)
    },
    Mutation        : {
        createUserCertificate : async (parent, {firstName, lastName, email}, {dbModels}, info) =>
            dbModels.UserCertificate.create({
                firstName : firstName,
                lastName  : lastName,
                email     : email
            }),
        updateUserCertificate : async (parent, {firstName, lastName, email, id}, {dbModels}, info) =>
            dbModels.UserCertificate.update({
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