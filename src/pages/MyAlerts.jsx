import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AlertContext } from "../context/AlertContext";

const MyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecent, setShowRecent] = useState(false);
  const { showAlert } = useContext(AlertContext); // ✅
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/emergency/my-alerts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlerts(alerts.filter((a) => a._id !== id));
      showAlert("Alert deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      showAlert("Failed to delete alert.");
    }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:5000/api/emergency/my-alerts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAlerts(sorted);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        showAlert("Failed to load alerts");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [showAlert]); // ✅ added here

  const now = new Date();
  const recentAlerts = alerts.filter((alert) => {
    const createdAt = new Date(alert.createdAt);
    const diffInHours = (now - createdAt) / (1000 * 60 * 60);
    return diffInHours <= 24;
  });

  const displayAlerts = showRecent ? recentAlerts : alerts;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🚨 My Emergency Alerts</h2>

      <div className="text-center mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowRecent(!showRecent)}
        >
          {showRecent ? "Show All Alerts" : "Show Last 24 Hours"}
        </button>
      </div>

      {displayAlerts.length === 0 ? (
        <p className="text-center text-muted">No alerts found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {displayAlerts.map((alert) => (
            <div className="col" key={alert._id}>
              <div className="card shadow-sm border-danger">
                <div className="card-body">
                  <h5 className="card-title text-danger">Emergency Alert</h5>
                  <p className="card-text mb-1">
                    <strong>Message:</strong> {alert.message}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Location:</strong>{" "}
                    {alert.location ? (
                      <a
                        href={`https://www.google.com/maps?q=${alert.location.lat},${alert.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Google Maps
                      </a>
                    ) : (
                      "Unknown"
                    )}
                  </p>

                  {alert.videoUrl ? (
                    <p className="mb-2">
                      <strong>Recording:</strong>{" "}
                      <a
                        href={alert.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        View Recording
                      </a>
                    </p>
                  ) : (
                    <p className="text-muted">📹 No video attached</p>
                  )}

                  <p className="card-text">
                    <small className="text-muted">
                      Sent at:{" "}
                      {alert.createdAt
                        ? new Date(alert.createdAt).toLocaleString()
                        : "N/A"}
                    </small>
                  </p>
                  <p className="card-text mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        alert.status === "delivered"
                          ? "bg-success"
                          : alert.status === "failed"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </p>
                  <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => handleDelete(alert._id)}
                  >
                    Delete Alert
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAlerts;
