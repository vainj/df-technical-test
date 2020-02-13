import path from "path";
import express from "express";
import compression from "compression";
import ssr from "./routes/ssr";
import favicon from "serve-favicon";

const app = express();

// Middleware for serving a favicon
app.use(
    favicon(path.resolve(__dirname, '../public/favicon.ico'))
);

// Uses Compression middleware to allow static content to be served with compression
app.use(compression());

// Serves the content using static directory
app.use(
    express.static(path.resolve(__dirname, '../public'))
);

// Uses our SSR router
app.use('/', ssr);

// Listen for connections on given port
app.listen(process.env.PORT || 8080);