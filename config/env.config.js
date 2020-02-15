// Imports
import * as dotEnv from 'dotenv';

// Loads environment variables from `.env` file
dotEnv.config();

export const ENV = {
    NODE_ENV : process.env.NODE_ENV || 'development',

    NODE_CLIENT_HOST : process.env.NODE_CLIENT_HOST || 'localhost',
    NODE_CLIENT_PORT : process.env.NODE_CLIENT_PORT || 8080,

    NODE_SERVER_HOST : process.env.NODE_SERVER_HOST || 'localhost',
    NODE_SERVER_PORT : process.env.NODE_SERVER_PORT || 4000,

    GRAPHQL_ENDPOINT : process.env.GRAPHQL_ENDPOINT,

    DB_HOST     : process.env.DB_HOST || 'localhost',
    DB_PORT     : process.env.DB_PORT || 3306,
    DB_DATABASE : process.env.DB_DATABASE,
    DB_USER     : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_DIALECT  : process.env.DB_DIALECT || 'mysql',
};