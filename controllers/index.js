const router = require('express').Router();

const apiRoutes = require('./api');
const homePageRoutes = require('./homePage');

router.use('/', homePageRoutes);
router.use('/api', apiRoutes);

module.exports = router;