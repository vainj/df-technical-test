// App imports
import {transporter} from "./transporter";
import hbs from "handlebars";
import fs from "fs";
import path from "path";

/**
 * Send email service
 */
export default class SendEmailService {
    /**
     * Sends email containing the certificate download link
     * @param {String} firstName
     * @param {email} email
     * @param {String} token
     * @return {Promise}
     */
    certificateFileEmail = (firstName, email, token) => {
        const downloadLink = process.env.NODE_SERVER_URL + '/download?token=' + token;

        // Loads and compiles HTML template
        const source   = fs.readFileSync(
            path.join(__dirname, 'templates/certificate-file.hbs'),
            'utf8'
        );
        const template = hbs.compile(source);

        return transporter.sendMail({
            from    : process.env.MAIL_FROM,
            to      : email,
            subject : `${firstName}, please find your requested certificate`,
            html    : template({
                firstName    : firstName,
                downloadLink : downloadLink
            })
        });
    };
};