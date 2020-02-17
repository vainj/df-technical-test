// Imports
import express from "express";
import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import bodyParser from "body-parser";

// App imports
import {ENV} from "../config";
import {typeDefsArray} from "./schemas/type_defs";
import {resolversArray} from "./schemas/resolvers";
import db from "../database/models";
import SendEmailService from "./services/mailers/send-email";

const app = express();

// Enable All CORS Requests
app.use(cors());

/*
 * GraphQL
 */
const dbModels = db.sequelize.models;
const server   = new ApolloServer({
    typeDefs  : typeDefsArray,
    resolvers : resolversArray,
    context   : {dbModels}
});
server.applyMiddleware({app});

// Support json encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

/*
 * Send email containing the download certificate link
 */
app.post('/send', function (req, res) {
    const sendEmailService = new SendEmailService();

    sendEmailService
        .certificateFileEmail(
            req.param('firstName'),
            req.param('email'),
            req.param('token')
        )
        .then(() => res.json({success : true}))
        .catch(() => res.json({success : false}));
});

/*
 * Generates and download certificate file
 */
//TODO


// Listen for connections on given port
app.listen(ENV.NODE_SERVER_PORT);