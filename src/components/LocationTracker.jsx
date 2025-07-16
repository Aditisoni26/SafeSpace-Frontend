// src/components/LocationTracker.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationTracker = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });

        try {
          await axios.post(
            'http://localhost:5000/api/location/update',
            { location: { lat: latitude, lng: longitude } },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.error('Failed to send location:', err);
        }
      },
      (err) => {
        setError('Unable to retrieve your location.');
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="text-center mt-3">
      {error && <p className="text-danger">{error}</p>}
      {position && (
        <p>
          <strong>Live Location:</strong> Lat {position.latitude}, Lng {position.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationTracker;
