import React, { useEffect, useState } from "react";
import API from '../utils/axios'; 


const NearbySafeZones = () => {
  const [safeZones, setSafeZones] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    console.log("📍 Coordinates:", latitude, longitude);

    try {
      const res = await API.get("/api/nearby-safezones/nearby", {
        params: { lat: latitude, lng: longitude },
      });
      setSafeZones(res.data.safeZones || []);
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      setError("Failed to fetch nearby safe zones.");
    }
  },
  (err) => {
    console.warn("⚠️ Geolocation error:", err.message);
    setError("Location access denied.");
  }
);

  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛡️ Nearby Safe Zones / Police Stations</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && safeZones.length === 0 && (
        <p className="text-center">⏳ Finding nearby police stations...</p>
      )}
      {safeZones.length > 0 && (
        <div className="list-group">
          {safeZones.map((zone, idx) => (
            <div key={idx} className="list-group-item">
              <h5 className="mb-1">{zone.name}</h5>
              <p className="mb-1">{zone.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${zone.lat},${zone.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                📍 View on Map
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbySafeZones;
