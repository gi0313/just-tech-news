const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;

//While this is a small file, we're keeping the API endpoints nice and organized while allowing the API to be scalable.