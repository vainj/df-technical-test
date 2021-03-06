# df-technical-test

This project is an application allowing a user to generate certificates (in image format) with his name and surname entered inside.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Before launching this project on your local machine you must install the following packages:
* Docker (https://docs.docker.com/install/)
* Docker Compose (https://docs.docker.com/compose/install/)

Install `npm` command on your local machine:
* https://www.npmjs.com/get-npm

Then you have to add the two lines below in the `hosts` file of your local machine:
```
127.0.0.1	nodeserver
127.0.0.1	mariadb
```

### Installing

1. Go to the project directory on your local machine
2. Install project dependencies:
    ```
    $ npm install
    ```
3. Create `.env` environment file (and set right values inside):
    ```
    $ cp .env.example .env
    ```
4. Execute this command to build and launch Docker containers:
    ```
    $ docker-compose up -d --build
    ```
5. Play the database migration files:
    ```
    # On your local machine 
    # (or into the 'nodeserver' container: `$ docker exec -it nodeserver bash`)
    
    # /!\ This error can appear if the `mariadb` container has not completely finished booting:
    # `ERROR: (conn=-1, no: 45009, SQLState: 08S01) socket has unexpectedly been closed`
    # -> Please wait some seconds
   
    # DB structure
    $ npx sequelize-cli db:migrate
    
    # DB seeds (optional)
    $ npx sequelize-cli db:seed:all
    ```

## Usage

URL:
* [Web application URL](http://localhost:8080): http://localhost:8080
* [GraphQL client](http://localhost:4000/graphql): http://localhost:4000/graphql

### Mailtrap
This project uses [Mailtrap](https://mailtrap.io/) to catch and visualize sent email in development environment.
* Invitation link (if you use default SMTP configuration): https://mailtrap.io/share/612348/3ea2b84e0892926522a241beb61458b1

You can switch to your favorite email testing service, in this case, you must edit environment variables into the `.env` file:
```
MAIL_HOST=smtp.****
MAIL_PORT=****
MAIL_USER=****
MAIL_PASSWORD=****
```

## Running the tests

Executes this command to run tests:
```
# On your local machine 
# (or into the 'nodeserver' container: `$ docker exec -it nodeserver bash`)

# Run tests
$ npm run test
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

* Testing purposes
* Deployment on a production environment
* Migrate to TypeScript
* Live browser reload
* Assets optimizations (minification, image size, ...)
* More dynamic React application (route => view)
* Better separation between client / server (package.json, ...)
* GraphQL authentication & Middleware (https://graphql.org/graphql-js/authentication-and-express-middleware/)
* JSdoc
* ESLint (https://eslint.org/)
* Uses Dockerfile to improve installation procedure