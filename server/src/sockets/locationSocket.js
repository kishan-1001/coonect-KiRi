const User = require('../models/User');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected for location updates:', socket.id);

    // Join user's location room
    socket.on('join-location', (userId) => {
      socket.join(`location-${userId}`);
      console.log(`User ${userId} joined location room`);
    });

    // Update location and broadcast to nearby users
    socket.on('update-location', async (data) => {
      try {
        const { userId, latitude, longitude } = data;

        // Update user location in database
        await User.findByIdAndUpdate(userId, {
          'location.coordinates': [longitude, latitude],
          'location.lastUpdated': new Date()
        });

        // Find nearby users and emit updates
        const nearbyUsers = await User.find({
          _id: { $ne: userId },
          'location.coordinates': {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              },
              $maxDistance: 5000 // 5km radius
            }
          }
        }).select('name location');

        // Emit to user's room
        socket.to(`location-${userId}`).emit('nearby-users-update', {
          nearbyUsers,
          userLocation: { latitude, longitude }
        });

      } catch (error) {
        console.error('Location update error:', error);
        socket.emit('location-error', { message: 'Failed to update location' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from location updates:', socket.id);
    });
  });
};
