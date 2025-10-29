import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { io } from 'socket.io-client';
import axios from 'axios';

const NearbyMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userLocation, setUserLocation] = useState(location.state?.userLocation || null);

  useEffect(() => {
    if (!userLocation) {
      navigate('/home');
      return;
    }

    // Initialize socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Join location room
    newSocket.emit('join-location', 'current-user-id'); // Replace with actual user ID

    // Listen for nearby users updates
    newSocket.on('nearby-users-update', (data) => {
      setNearbyUsers(data.nearbyUsers);
      updateMarkers(data.nearbyUsers, data.userLocation);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userLocation, navigate]);

  const updateMarkers = (users, userLoc) => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers = [];

    // Add user marker
    const userMarker = new google.maps.Marker({
      position: { lat: userLoc.latitude, lng: userLoc.longitude },
      map: map,
      title: 'You',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="10" cy="10" r="8" fill="%23009688"/%3E%3C/svg%3E',
        scaledSize: new google.maps.Size(30, 30)
      }
    });
    newMarkers.push(userMarker);

    // Add nearby users markers
    users.forEach(user => {
      const marker = new google.maps.Marker({
        position: {
          lat: user.location.coordinates[1],
          lng: user.location.coordinates[0]
        },
        map: map,
        title: user.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="10" cy="10" r="8" fill="%23FF6B6B"/%3E%3C/svg%3E',
          scaledSize: new google.maps.Size(25, 25)
        }
      });
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
    if (userLocation) {
      mapInstance.setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
      mapInstance.setZoom(15);
    }
  };

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <div>Loading map...</div>;
      case Status.FAILURE:
        return <div>Error loading map</div>;
      case Status.SUCCESS:
        return <MapComponent onLoad={onMapLoad} />;
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Nearby Users</h2>
        <p className="text-sm text-gray-600">
          {nearbyUsers.length} users found nearby
        </p>
        <button
          onClick={() => navigate('/home')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>

      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}
        render={render}
      />
    </div>
  );
};

const MapComponent = ({ onLoad }) => {
  const ref = useRef();

  useEffect(() => {
    const map = new google.maps.Map(ref.current, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
      disableDefaultUI: false,
    });
    onLoad(map);
  }, [onLoad]);

  return <div ref={ref} className="h-full w-full" />;
};

export default NearbyMap;
