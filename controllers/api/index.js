const router = require('express').Router();

const apiRoutes = require('./api');
const blogPostRoute = require('./blogPostRoute');
const commentRoute = require('./commentRoute');
const userRoute = require('./usersRoute');
const homePageRoute = require('./homePage')

router.use('/api', apiRoutes);
router.use('/', blogPostRoute);
router.use('/', commentRoute);
router.use('/', userRoute);
router.use('/', homePageRoute);

module.exports = router;
