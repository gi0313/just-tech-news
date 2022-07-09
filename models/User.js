const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
//First, we imported the Model class and DataTypes object from Sequelize. 
//This Model class is what we create our own models from using the extends keyword so User inherits all of the functionality the Model class has.


// create our User model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
  //{
  //The nested level of the object inserted is very important. 
  //Notice that the hooks property was added to the second object in User.init().
  //hooks: {
  //set up beforeCreate lifecycle "hook" functionality
  //beforeCreate(userData) {
  //We use the beforeCreate() hook to execute the bcrypt hash function on the plaintext password.
  //return bcrypt.hash(userData.password, 10).then(newUserData => {
  //In the bcrypt hash function, we pass in the userData object that contains the plaintext password in the password property. 
  //We also pass in a saltRound value of 10.
  //return newUserData
  //The resulting hashed password is then passed to the Promise object as a newUserData object with a hashed password property
  //The return statement then exits out of the function, returning the hashed password in the newUserData function.
  //});
  //}
  //},
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
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

module.exports = User;