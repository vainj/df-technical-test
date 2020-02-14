// Imports
import React from "react";
import {hydrate} from "react-dom";

// App imports
import App from "./app";

/**
 * Same as render(), but is used to hydrate a container
 * whose HTML contents were rendered by ReactDOMServer
 */
const app = document.getElementById('app');
hydrate(<App/>, app);