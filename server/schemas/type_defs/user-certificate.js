// Imports
import {gql} from "apollo-server-express";

export const typeDefs = gql`
    type UserCertificate {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        token: String!
        fullName: String!        
    }

    extend type Query {
        userCertificates: [UserCertificate!]
        userCertificate(id: ID!): UserCertificate
        userCertificateByEmail(email: String!): UserCertificate
    }
    
    extend type Mutation {
        createUserCertificate(
            firstName: String!, 
            lastName:String!, 
            email: String!
            token: String!
        ): UserCertificate!
        updateUserCertificate(
            id: ID!, 
            firstName: String!, 
            lastName:String!,
            email: String!
            token: String!
        ): [ID!]!
    }
`;