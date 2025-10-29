import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNearbyClick = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Send location to server
          await axios.put('/api/users/location', {
            latitude,
            longitude
          });

          // Redirect to map page
          navigate('/nearby-map', {
            state: { userLocation: { latitude, longitude } }
          });
        } catch (error) {
          console.error('Error updating location:', error);
          alert('Failed to update location. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Location access denied. Please enable location permissions.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Connectify
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find your perfect match and connect with like-minded people
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Match Finder</h3>
              <p className="text-gray-600">Discover people who share your interests</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activities</h3>
              <p className="text-gray-600">Join events and activities in your area</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat</h3>
              <p className="text-gray-600">Connect and chat with your matches</p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={handleNearbyClick}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">KiRi Nearby</h3>
              <p className="text-gray-600">
                {loading ? 'Getting location...' : 'Find people nearby using the app'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
