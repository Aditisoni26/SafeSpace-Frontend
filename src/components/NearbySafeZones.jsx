import React, { useEffect, useState } from "react";
import API from "../utils/axios";

const NearbySafeZones = () => {
  const [safeZones, setSafeZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch safe zones from backend
  const fetchSafeZones = async (lat, lng) => {
    try {
      const res = await API.get("/api/nearby-safezones/nearby", {
        params: { lat, lng }
      });

      setSafeZones(res.data.safeZones || []);
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      setError("Failed to fetch nearby safe zones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Geolocation not supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    // Request location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Coordinates:", latitude, longitude);
        fetchSafeZones(latitude, longitude);
      },
      (err) => {
        console.warn("⚠️ Geolocation error:", err.message);
        setError("Location access denied. Unable to find nearby safe zones.");
        setLoading(false);
      },
      {
        timeout: 10000,      // ⏱️ prevents infinite waiting
        enableHighAccuracy: false
      }
    );
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        🛡️ Nearby Safe Zones / Police Stations
      </h2>

      {/* Loading */}
      {loading && (
        <p className="text-center">
          ⏳ Detecting your location and finding nearby safe zones...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* No data */}
      {!loading && !error && safeZones.length === 0 && (
        <p className="text-center">
          No nearby safe zones found.
        </p>
      )}

      {/* Data */}
      {!loading && !error && safeZones.length > 0 && (
        <div className="list-group">
          {safeZones.map((zone, idx) => (
            <div key={idx} className="list-group-item">
              <h5 className="mb-1">{zone.name}</h5>
              <p className="mb-1">{zone.address}</p>

              {zone.lat && zone.lon && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${zone.lat},${zone.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary"
                >
                  📍 View on Map
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbySafeZones;
