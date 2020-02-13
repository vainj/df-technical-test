const path              = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        new CopyWebpackPlugin([
            {from : 'resources', to : '.'}
        ]),
    ],
};

module.exports = config;