// Imports
import Sequelize from 'sequelize';
import fs from "fs";
import path from "path";

// App Imports
import dbConnection from '../connection';

const basename = path.basename(__filename);
const models   = {};

// Stores all models
fs.readdirSync(__dirname)
  .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
      const model        = dbConnection['import'](path.join(__dirname, file));
      models[model.name] = model;
  });

// And models relationships if exist
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = dbConnection;
models.Sequelize = Sequelize;

export default models;