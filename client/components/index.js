// Imports
import React from "react";
import {hydrate} from "react-dom";
import {SnackbarProvider} from "notistack";

// App imports
import App from "./app";

/**
 * Same as render(), but is used to hydrate a container
 * whose HTML contents were rendered by ReactDOMServer
 */
const app = document.getElementById('app');
hydrate(<SnackbarProvider maxSnack={3}><App/></SnackbarProvider>, app);