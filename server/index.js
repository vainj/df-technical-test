// Imports
import express from "express";
import {ApolloServer} from "apollo-server-express";

// App imports
import {ENV} from "../config";
import {userCertificateTypeDefs} from "./graphql/user_certificate/schema";
import {userCertificateResolver} from "./graphql/user_certificate/resolver";
import db from "../database/models";

const server = new ApolloServer({
    typeDefs  : userCertificateTypeDefs,
    resolvers : userCertificateResolver,
    context   : {db}
});

const app = express();
server.applyMiddleware({app});

// Listen for connections on given port
app.listen(ENV.NODE_SERVER_PORT);