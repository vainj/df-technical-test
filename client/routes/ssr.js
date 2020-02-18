// Imports
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import hbs from "handlebars";
import {SnackbarProvider} from "notistack";

// App imports
import App from "../components/app";
import {layout} from "../components/layout";

const router = express.Router();

/**
 * Route to load and display the application
 */
router.get('/', async (req, res) => {
    const hbsLayoutTemplate = hbs.compile(layout);
    const reactAppComponent = renderToString(<SnackbarProvider maxSnack={3}><App/></SnackbarProvider>);
    const htmlToDisplay     = hbsLayoutTemplate({reactDom : reactAppComponent});
    res.send(htmlToDisplay);
});

export default router;