const express = require('express');
const { updateLocation, getNearbyUsers } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Update user location
router.put('/location', updateLocation);

// Get nearby users
router.get('/nearby', getNearbyUsers);

module.exports = router;
