const router = require('express').Router();
const { blogPost, User } = require('../../models');
const withAuth = require('../utils/auth');
const { Comment } = require('../models');

// route for all comments for a post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
           where: { pos_id: req.params.postId }, 
        });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

// creating a new comment
router.post('/post/:postId', withAuth, async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params;

        const newComment = await Comment.create({
            content,
            post_id: postId,
        });
        
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.'});
    }
});

module.exports = router;