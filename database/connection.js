// Imports
import {Sequelize} from 'sequelize';

// App Imports
import {ENV} from "../config";

// Creates new database connection
const connection = new Sequelize(
    ENV.DB_DATABASE,
    ENV.DB_USER,
    ENV.DB_PASSWORD,
    {
        host    : ENV.DB_HOST,
        port    : ENV.DB_PORT,
        dialect : ENV.DB_DIALECT,
        define  : {
            freezeTableName : true,
        },
        pool    : {
            max     : 5,
            min     : 0,
            acquire : 30000,
            idle    : 10000,
        }
    }
);

// Test connection
console.info('SETUP - Connecting database...');
connection.authenticate()
          .then(() => {
              console.info('Database connected.');
          })
          .catch(err => {
              console.error('Unable to connect to the database:', err);
          });

export default connection;