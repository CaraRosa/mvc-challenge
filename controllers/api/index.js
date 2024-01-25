const router = require('express').Router();

const blogPostRoute = require('./blogPostRoute');
const commentRoute = require('./commentRoute');
const userRoute = require('./usersRoute');

router.use('/', blogPostRoute);
router.use('/', commentRoute);
router.use('/', userRoute);

module.exports = router;
