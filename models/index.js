const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, { //In this statement, we are defining the relationship of the Post model to the User
    foreignKey: 'user_id',
//we declare the link to the foreign key, which is designated at user_id in the Post model.
});

// We instruct the application that the User and Post models will be connected through the Vote model
User.belongsToMany (Post, {
    through: Vote,
    as: 'voted_posts', //We also stipulate that the name of the Vote model should be displayed as voted_posts when queried on
    foreignKey: 'user_id' //We state what we want the foreign key to be in Vote
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});
//With these two .belongsToMany() methods in place, we're allowing both the User and Post models 
//to query each other's information in the context of a vote
//If we want to see which users voted on a single post, we can now do that
//If we want to see which posts a single user voted on, we can see that too

Vote.belongsTo(User, {
    foreignKey: 'User_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'post_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment};