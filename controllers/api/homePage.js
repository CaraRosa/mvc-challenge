const router = require('express').Router();
const { blogPost, User } = require('../../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await blogPost.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });
    const blogs = blogData.map((blogPost) => blogPost.get({ plain: true}));

    res.render('homepage', {
        blogPost,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await blogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });
        const blog = blogData.get({ plain: true });
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})