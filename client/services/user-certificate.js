// Imports
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import fetch from "node-fetch";

/**
 * User certificate service
 */
export default class UserCertificateService {
    /**
     * Constructor
     */
    constructor() {
        this.client = new ApolloClient({
            uri   : process.env.GRAPHQL_ENDPOINT,
            fetch : fetch,
        });
    }

    /**
     * Insert a new "user certificate" or update an existing one if the email already exists in DB
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @return {Promise}
     */
    save(firstName, lastName, email) {
        return this.findByEmail(email)
                   .then((result) => {
                       if (
                           result.hasOwnProperty('data')
                           && result.data.hasOwnProperty('userCertificateByEmail')
                           && result.data.userCertificateByEmail !== null) {
                           // A user with the same email address already exists, we update it so
                           const userId = result.data.userCertificateByEmail.id;

                           return this.update(userId, firstName, lastName, email);
                       } else {
                           // There is no existing user with the same email address, we insert it so
                           return this.insert(firstName, lastName, email);
                       }
                   });
    }

    /**
     * Finds a "user certificate" by a given email
     * @param {String} email
     * @return {Promise}
     */
    findByEmail(email) {
        const query = gql`
            query {
              userCertificateByEmail(email:"${email}"){id,firstName,lastName}
            }
        `;

        return this.client.query({query});
    }

    /**
     * Insert a new "user certificate"
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @return {Promise}
     */
    insert(firstName, lastName, email) {
        const mutation = gql`
            mutation {
                createUserCertificate(
                    firstName:"${firstName}",
                    lastName:"${lastName}",
                    email:"${email}"
                ){id}
            }
        `;

        return this.client.mutate({mutation});
    }

    /**
     * Update an existing "user certificate"
     * @param {Integer} id
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @return {Promise}
     */
    update(id, firstName, lastName, email) {
        const mutation = gql`
            mutation {
                updateUserCertificate(
                    id:"${id}",
                    firstName:"${firstName}",
                    lastName:"${lastName}",
                    email:"${email}"
                )
            }
        `;

        return this.client.mutate({mutation});
    }
};