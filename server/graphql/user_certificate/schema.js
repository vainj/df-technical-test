// Imports
import {gql} from "apollo-server-express";

export const userCertificateTypeDefs = gql`
    type UserCertificate {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        fullName: String!        
    }

    type Query {
        userCertificates: [UserCertificate!]
        userCertificate(id: ID!): UserCertificate
    }
    
    type Mutation {
        createUserCertificate(firstName: String!, lastName:String!, email: String!): UserCertificate!
        updateUserCertificate(id: ID!, firstName: String!, lastName:String!, email: String!): [Int!]!
    }
`;