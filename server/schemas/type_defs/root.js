/*
 * Holds top level mutation and query to extend
 */
import {gql} from "apollo-server-express";

export const rootTypeDefs = gql`
    type Query {
        root: String
    }
    type Mutation {
        root: String
    }
`;