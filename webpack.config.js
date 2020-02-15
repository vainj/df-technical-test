const path              = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv            = require("dotenv");
const webpack           = require("webpack");

// Loads and parses `.env` file to store variables at runtime
const env     = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const config = {
    entry   : {
        vendor : ["@babel/polyfill", "react"],
        app    : ["./client/components/index.js"]
    },
    output  : {
        path     : path.resolve(__dirname, "public"),
        filename : "[name].js"
    },
    module  : {
        rules : [
            {
                test    : /\.(js|jsx)$/,
                use     : {
                    loader  : "babel-loader",
                    options : {
                        presets : ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                exclude : /node_modules/
            }
        ]
    },
    resolve : {
        extensions : [".js", ".jsx", ".json", ".wasm", ".mjs", "*"]
    },
    plugins : [
        new webpack.DefinePlugin(envKeys),
        new CopyWebpackPlugin([
            {from : 'resources', to : '.'}
        ]),
    ],
    node    : {
        fs : 'empty'
    }
};

module.exports = config;