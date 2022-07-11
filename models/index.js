const User = require('./User');
const Post = require('./Post');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, { //In this statement, we are defining the relationship of the Post model to the User
    foreignKey: 'user_id',
//we declare the link to the foreign key, which is designated at user_id in the Post model.
});

module.exports = { User, Post };