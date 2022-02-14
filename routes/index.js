// Require express router
const router = require('express').Router();

// Import all of the API routes 
const apiRoutes = require('./apiRoutes');

// add prefix of `/api` to all of the api routes
router.use('/api', apiRoutes);

// 404 Status error message
router.use((req, res) => {
    res.status(404).send('<h1>404 Route is not supported</h1>');
  });

// Module exports router
module.exports = router;