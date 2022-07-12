//import the sequalize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

//create connection to our database, pass in MySQL information for username and password

// with jaws in heroku 
let sequelize;

//When the app is deployed, it will have access to Heroku's process.env.JAWSDB_URL variable and use that value to connect
if(process.env.JawSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    } else { //Otherwise, it will continue using the localhost configuration.
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
  })
}
module.exports = sequelize;