// Imports
import express from "express";
import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import fs from "fs";

// App imports
import {ENV} from "../config";
import {typeDefsArray} from "./schemas/type_defs";
import {resolversArray} from "./schemas/resolvers";
import db from "../database/models";
import SendEmailService from "./services/mailers/send-email";
import CertificateService from "./services/certificate";

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
            req.body.firstName,
            req.body.email,
            req.body.token
        )
        .then(() => res.json({success : true}))
        .catch(() => res.json({success : false}));
});

/*
 * Generates and download certificate file
 */
app.get('/download', function (req, res) {
    // Verifies and decodes given token
    jwt.verify(
        req.query.token,
        ENV.JWT_SECRET,
        (err, decoded) => {
            if (err || !decoded || !decoded.hasOwnProperty('fullName') || !decoded.fullName) {
                res.status(401).send('Invalid given token!');
            } else {
                const fullName = decoded.fullName;

                const certificateService = new CertificateService();

                certificateService.generate(fullName)
                                  .then((generatedFile) => {
                                      res.download(
                                          generatedFile,
                                          () => fs.unlinkSync(generatedFile)
                                      );
                                  })
                                  .catch((error) => {
                                      res.status(500).send(error);
                                  });
            }
        }
    );
});

// Listen for connections on given port
app.listen(ENV.NODE_SERVER_PORT);