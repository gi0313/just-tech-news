const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
//Also, note we're importing the connection to Sequelize from config/connection.js

const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({force: true }).then(() => { //This definition performs similarly to DROP TABLE IF EXISTS,
//we use the sequelize.sync() method to establish the connection to the database
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it for you!
    app.listen(PORT, () => console.log('Now listening'));
});

//The router instance in routes/index.js collected everything for us and packaged them up for server.js to use