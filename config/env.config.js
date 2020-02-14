import * as dotEnv from 'dotenv';

dotEnv.config();

export const ENV = {
    NODE_ENV : process.env.NODE_ENV || 'development',

    NODE_CLIENT_HOST : process.env.NODE_CLIENT_HOST || '127.0.0.1',
    NODE_CLIENT_PORT : process.env.NODE_CLIENT_PORT || 8080,

    NODE_SERVER_HOST : process.env.NODE_SERVER_HOST || '127.0.0.1',
    NODE_SERVER_PORT : process.env.NODE_SERVER_PORT || 4000,

    DB_HOST     : process.env.DB_HOST || '127.0.0.1',
    DB_PORT     : process.env.DB_PORT || 3306,
    DB_DATABASE : process.env.DB_DATABASE,
    DB_USER     : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_DIALECT  : process.env.DB_DIALECT || 'mysql',
};