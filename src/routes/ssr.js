import express from "express";
import App from "../components/app";
import React from "react";
import {renderToString} from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();

/**
 * Default "/" route to load and display the application
 */
router.get('/', async (req, res) => {
    //TODO: Externalizes this HTML!
    const layout = `
        <!doctype html>
        <html lang="en">
            <head>
                <title>Certificate generator</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <main id="app-component">{{{appComponent}}}</main>

                <script src="/app.js" charset="utf-8"></script>
                <script src="/vendor.js" charset="utf-8"></script>
            </body>
        </html>
    `;

    const hbsLayoutTemplate = hbs.compile(layout);
    const reactAppComponent = renderToString(<App/>);
    const htmlToDisplay     = hbsLayoutTemplate({appComponent : reactAppComponent});
    res.send(htmlToDisplay);
});

export default router;