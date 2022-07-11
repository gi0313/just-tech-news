const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
//Also, note we're importing the connection to Sequelize from config/connection.js

const app = express();
const PORT = process.env.PORT || 3001;

app .use(express.json());
app.use(express.urlencoded({extended: true}));

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({force: false}).then(() => { //This definition performs similarly to DROP TABLE IF EXISTS,
//we use the sequelize.sync() method to establish the connection to the database
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it for you!
    app.listen(PORT, () => console.log('Now listening'));
});

//The router instance in routes/index.js collected everything for us and packaged them up for server.js to use