// Imports
import express from "express";
import {ApolloServer} from "apollo-server-express";

// App imports
import {ENV} from "../config";
import {typeDefsArray} from "./schemas/type_defs";
import {resolversArray} from "./schemas/resolvers";
import db from "../database/models";

const dbModels = db.sequelize.models;
const server   = new ApolloServer({
    typeDefs  : typeDefsArray,
    resolvers : resolversArray,
    context   : {dbModels}
});

const app = express();
server.applyMiddleware({app});

// Listen for connections on given port
app.listen(ENV.NODE_SERVER_PORT);