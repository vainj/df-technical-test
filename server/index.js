import {ENV} from "../config";
import express from "express";
import {ApolloServer, gql} from "apollo-server-express";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query : {
        hello : () => 'Hello world!',
    },
};

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

// Listen for connections on given port
app.listen(ENV.NODE_SERVER_PORT);