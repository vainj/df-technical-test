// Imports
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

/**
 * User certificate service
 */
export default class UserCertificateService {
    /**
     * Constructor
     */
    constructor() {
        this.jwtSecret      = process.env.JWT_SECRET;
        this.tokenExpiresIn = "1h"; //Token validity period (here 1 hour)

        this.client                = new ApolloClient({
            uri   : process.env.NODE_SERVER_URL + '/graphql',
            fetch : fetch,
        });
        this.client.defaultOptions = {
            watchQuery : {
                fetchPolicy : 'cache-and-network',
                errorPolicy : 'all',
            },
            query      : {
                fetchPolicy : 'network-only'
            }
        };
    }

    /**
     * Insert a new "user certificate" or update an existing one if the email already exists in DB
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @return {Promise}
     */
    save = (firstName, lastName, email) => {
        const token = this.generateToken(firstName, lastName);

        return this.findByEmail(email)
                   .then((result) => {
                       if (
                           result.hasOwnProperty('data')
                           && result.data.hasOwnProperty('userCertificateByEmail')
                           && result.data.userCertificateByEmail !== null) {
                           // A user with the same email address already exists, we update it so
                           const userId = result.data.userCertificateByEmail.id;

                           return this.update(userId, firstName, lastName, email, token);
                       } else {
                           // There is no existing user with the same email address, we insert it so
                           return this.insert(firstName, lastName, email, token);
                       }
                   });
    };

    /**
     * Finds a "user certificate" by a given email
     * @param {String} email
     * @return {Promise}
     */
    findByEmail = (email) => {
        const query = gql`
            query {
              userCertificateByEmail(email:"${email}"){id,firstName,lastName}
            }
        `;

        return this.client.query({query});
    };

    /**
     * Insert a new "user certificate"
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} token
     * @return {Promise}
     */
    insert = (firstName, lastName, email, token) => {
        const mutation = gql`
            mutation {
                createUserCertificate(
                    firstName:"${firstName}",
                    lastName:"${lastName}",
                    email:"${email}",
                    token:"${token}"
                ){id,firstName,lastName,email,token}
            }
        `;

        return this.client.mutate({mutation});
    };

    /**
     * Update an existing "user certificate"
     * @param {Integer} id
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} token
     * @return {Promise}
     */
    update = (id, firstName, lastName, email, token) => {
        const mutation = gql`
            mutation {
                updateUserCertificate(
                    id:"${id}",
                    firstName:"${firstName}",
                    lastName:"${lastName}",
                    email:"${email}",
                    token:"${token}"
                ){id,firstName,lastName,email,token}
            }
        `;

        return this.client.mutate({mutation});
    };

    /**
     * Generates a JWT token for future download
     * @param {String} firstName
     * @param {String} lastName
     * @return {String}
     */
    generateToken = (firstName, lastName) => {
        return jwt.sign(
            {
                firstName : firstName,
                lastName  : lastName
            },
            this.jwtSecret,
            {expiresIn : this.tokenExpiresIn}
        );
    };
};