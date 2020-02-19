// Imports
import Jimp from "jimp";
import path from "path";
import slugify from "slugify";

// App imports
import {ENV} from "../../config";

/**
 * Certificate image service
 */
export default class CertificateService {
    /**
     * Generates the user certificate with the given full name
     * @param {String} fullName
     * @return {Promise}
     */
    generate = async (fullName) => {
        const slug          = slugify(fullName) + '-' + Date.now();
        const sourceFile    = path.resolve(__dirname, `../../resources/${ENV.CERTIFICATE_TPL_NAME}`);
        let destinationFile = path.resolve(__dirname, `../../public/tmp/certificate-${slug}.jpg`);

        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => font);
        return Jimp.read(sourceFile)
                   .then(image => {

                       return image
                           .print(
                               font,
                               parseInt(ENV.CERTIFICATE_TPL_TEXT_X, 10),
                               parseInt(ENV.CERTIFICATE_TPL_TEXT_Y, 10),
                               {
                                   text : fullName
                               },
                               parseInt(ENV.CERTIFICATE_TPL_TEXT_MAX_WIDTH, 10),
                               parseInt(ENV.CERTIFICATE_TPL_TEXT_MAX_HEIGHT, 10)
                           )
                           .writeAsync(destinationFile);
                   })
                   .then(() => destinationFile);
    };
};
