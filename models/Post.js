const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}


// create fields/columns for Post model
Post.init( //we define the Post schema
    {
      id: { //as the primary key and set it to auto-increment
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: { //we define the title column as a String value
        type: DataTypes.STRING,
        allowNull: false
      },
      post_url: { //this column determines who posted the news article
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      user_id: {  //Here, we ensure that this url is a verified link by setting the isURL property to true
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
//Using the references property, we establish the relationship between this post and the user by creating a reference to the User model, 
//specifically to the id column that is defined by the key property, which is the primary key. 
//The user_id is conversely defined as the foreign key and will be the matching link
        }
      }
    },
    {
      sequelize, //we configure the metadata, including the naming conventions
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );//we define the Post schema

module.exports = Post;