const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;

//While this is a small file, we're keeping the API endpoints nice and organized while allowing the API to be scalable.