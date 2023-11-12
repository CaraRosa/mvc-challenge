const express = require('express');
const router = express.Router();
const { User } = require('../models');

// display signup form
router.get('/signup', (req, res) => {
    res.render('signup');
});

// sigup form submission
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });

        res.redirect('/login');
    } catch (error) {
        console.error('Error while signing up', error);
        res.status(500).send('Internal Server Error');
    }
});

// display login form
router.get('/login', (req, res) => {
    res.render('login');
});

// login form submission
router.post('/login', async (req, res) => {
    const {username, password } = req.body;
    const user = await User.findOne({ wehre: { username, password} });

    if(user) {
        res.render('login', { error: 'Invalid username or password' });
    }
});

// logout
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.error('Error destorying session', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/homepage')
        }
    });
})

module.exports = router;