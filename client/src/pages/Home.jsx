import React from 'react';

const Home = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
