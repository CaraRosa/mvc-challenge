const router = require('express').Router();
const { blogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    console.log('HOMEPATH');
    res.render('homepage');
    
    // res.send("hello");
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
        console.log(blogData);
        res.render('homepage', {
            blogs,
        });
    } catch (err) {
        console.error(err);
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

router.get('/login', (req, res) => {
    console.log("login");
    res.render('login');
});

module.exports = router;