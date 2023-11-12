const express = require('express');
const router = express.Router();
const { blogPost } = require('../models');
const withAuth = require('../middleware/withAuth');

// gets all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await blogPost.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get one post by id
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await blogPost.findByPk(req.params.id);
        if(!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json(post);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

// create a new post
router.post('/posts', withAuth, async (req, res) => {
    try {
        const { post_title, contents, creator_username, user_id } = req.body;

        if(user_id !== req.session.user_id) {
            return res.status(403).json({ error: 'Unauthorized'});
        }
        
        const newPost = await blogPost.create({
            post_title,
            contents,
            creator_username,
            user_id,
        });
        res.status(201).json(newPost);
    } catch (error) {
    console.error(error);
     res.status(500).json({ error: 'Internal Server Error.'});
    }
});

// update a blog post
router.put('/posts/:id', async (req, res) => {
    try {
        const { post_title, contents, date_updated } = req.body;
        const updatedPost = await blogPost.update(
            {
                post_title,
                contents,
                date_updated,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal SErver Erorr'});
    }
});

// delete a blog post
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await blogPost.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(deletedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal SErver Error' });
    }
});

module.exports = router;