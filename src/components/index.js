import React from "react";
import {hydrate} from "react-dom";
import App from "./app";

/**
 * Same as render(), but is used to hydrate a container
 * whose HTML contents were rendered by ReactDOMServer
 */
hydrate(<App/>, document.getElementById('app-component'));