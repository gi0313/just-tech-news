const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//First, we imported the Model class and DataTypes object from Sequelize. 
//This Model class is what we create our own models from using the extends keyword so User inherits all of the functionality the Model class has.


// create our User model
class User extends Model {}

// create fields/columns for User model
User.init(
//Once we create the User class, we use the .init() method to initialize the model's data and configuration, passing in two objects as arguments. 
//The first object will define the columns and data types for those columns. The second object it accepts configures certain options for the table
  {
    // define id column
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, //this is the equivalent of SQL 'NOT NULL'
      primaryKey: true, //instruct that this is the primary key
      autoIncrement: true //turn on aout increment
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //there cannot be any duplicate email values in this table
      validate: {
    //if allowNull is set to false, we can run our data through validators before creating the table data
        isEmail: true
      }
    },
    //password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4] //means the passwords must be at least 4 characters long
      }
    }
  },
  {
     //pass in our imported sequelize connections (the direct connection to our database)
    sequelize,
    //dont automatically create createdAT/updatedAT timestamp fields
    timestamps: false,
    //dont pluralize name of database table
    freezeTableName: true,
    //use underscores instead of camel-casing(i.e 'comment_text' and not 'commentText')
    underscored: true,
    //make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

// const { Model, DataTypes} = require('sequelize');
// const sequelize = require('../config/connection');
// 
// //create our User model
// class User extends Model {}

// //define table columns and configuration
// User.init(

//         // TABLE COLUMN DEFIFNITIONS GO HERE
//         
//         id: {
//             //use the special Sequelize Datatypes object provide what type of data it is
//             type: DataTypes.INTEGER,
//             
//             allowNull: false,
//             
//             primaryKey: true,
//             
//             autoIncrement: true
//         },
//         
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//          
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             
//             unique: true,
//             
//             validate: {
//                 isEmail: true 
//             }
//         },
//          
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 
//                 len: [4]
//             }
//         }
//     },
//     {
//         // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))


module.exports = User;