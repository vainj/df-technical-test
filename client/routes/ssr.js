// Imports
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import hbs from "handlebars";

// App imports
import App from "../components/app";

const router = express.Router();

/**
 * Route to load and display the application
 */
router.get('/', async (req, res) => {
    //TODO: Externalizes this HTML!
    const layout = `
        <!doctype html>
        <html lang="en">
            <head>
                <title>Certificate generator</title>
                
                <meta name="viewport" content="width=device-width, initial-scale=1">
                
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons|Roboto:300,400,500,700&display=swap">
            </head>
            <body>
                <div id="app">{{{reactDom}}}</div>

                <script src="/app.js" charset="utf-8"></script>
                <script src="/vendor.js" charset="utf-8"></script>
            </body>
        </html>
    `;

    const hbsLayoutTemplate = hbs.compile(layout);
    const reactAppComponent = renderToString(<App/>);
    const htmlToDisplay     = hbsLayoutTemplate({reactDom : reactAppComponent});
    res.send(htmlToDisplay);
});

export default router;