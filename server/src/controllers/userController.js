const User = require('../models/User');

// Update user location
const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user.id; // Assuming auth middleware sets req.user

    const user = await User.findByIdAndUpdate(
      userId,
      {
        'location.coordinates': [longitude, latitude],
        'location.lastUpdated': new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Location updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get nearby users
const getNearbyUsers = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query; // radius in meters, default 5km
    const userId = req.user.id;

    const nearbyUsers = await User.find({
      _id: { $ne: userId }, // Exclude current user
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).select('name email location');

    res.json({ nearbyUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  updateLocation,
  getNearbyUsers
};
