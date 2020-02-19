# df-technical-test

This project is an application allowing a user to generate certificates (in image format) with his name and surname entered inside.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Before launching this project on your local machine you must install the following packages:
- Docker (https://docs.docker.com/install/)
- Docker Composer (https://docs.docker.com/compose/install/)

Then you have to add the two lines below in the `hosts` file of your local machine:
```
127.0.1.1	nodeserver
127.0.1.1	mariadb
```

### Installing

1. Go to the project directory on your local machine 
2. Execute this command to build and launch Docker containers:
    ```
    $ docker-compose up -d --build
    ```
3. Install project dependencies:
    ```
    # Connect into the 'nodeserver' container
    $ docker exec -it nodeserver bash
    
    # Install project dependencies
    node@6a6aae7eb70f:~/app$ npm install
    ```
4. Play the database migration files:
    ```
    # Connect into the 'nodeserver' container
    $ docker exec -it nodeserver bash
    
    # DB structure
    node@6a6aae7eb70f:~/app$ npx sequelize-cli db:migrate
    
    # DB seeds (optional)
    node@6a6aae7eb70f:~/app$ npx sequelize-cli db:seed:all
    ```
5. Restart containers:
    ```
    $ docker-compose stop && docker-compose up -d --build
    ```

## Running the tests

Executes this command to run tests:
```
# Connect into the 'nodeserver' container
$ docker exec -it nodeserver bash

# Run tests
node@6a6aae7eb70f:~/app$ npm run test
```

## Built With

* [Docker](https://www.docker.com/) - Standardized unit of software
* [Express](https://expressjs.com/en/) - Web framework for Node.js
* [ReactJS](https://reactjs.org/) - JavaScript library for building user interfaces
* [Webpack](https://webpack.js.org/) - A module bundler
* [GraphQL](https://graphql.org/) - Query language for your API
* [Apollo](https://www.apollographql.com/) - Complete system to build, manage, and access a data graph
* [MariaDB](https://mariadb.org/) - Relation database

## Authors

* **Jérémy Vain** - https://github.com/vainj

## TODO

- Testing purposes
- Deployment on a production environment
- Migrate to TypeScript
- Live browser reload
- Assets optimizations (minification, image size, ...)
- More dynamic React application (route => view)
- Better separation between client / server (package.json, ...)
- GraphQL authentication & Middleware (https://graphql.org/graphql-js/authentication-and-express-middleware/)
- JSdoc
- ESLint (https://eslint.org/)
- Uses Dockerfile to improve installation procedure