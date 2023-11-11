// import models
const blogPost = require('./blogPost');
const Comment = require('./comment');
const Session = require('./sessions');
const User = require('./users');

// user and blog post associations
User.hasMany(blogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

blogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

// blog post and comment association
blogPost.hasMany(Comment, {
   foreignKey: 'post_id',
   onDelete: 'CASCADE',
});

blogPost.belongsTo(User, {
    foreignKey: 'post_id',
});