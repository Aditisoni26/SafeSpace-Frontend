// src/utils/alertUtils.js
import axios from 'axios';

export const handleAlert = (showAlert) => {
  if (!navigator.geolocation) {
    showAlert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const sendAlert = async () => {
        const { latitude, longitude } = position.coords;
        const token = localStorage.getItem("token");

        if (!token) {
          showAlert("You're not logged in. Please log in first.");
          return;
        }

        const location = { lat: latitude, lng: longitude };
        const headers = { Authorization: `Bearer ${token}` };

        try {
          // 1️⃣ Send emergency alert to /api/emergency
          const alertRes = await axios.post("http://localhost:5000/api/emergency", {
            location,
            message: "Emergency! Please help.",
          }, { headers });

          console.log("Alert sent:", alertRes.data.message);

          // 2️⃣ Notify Trusted Contacts
          await axios.post("http://localhost:5000/api/emergency/my-alerts/send", {
            location,
          }, { headers });

          showAlert("🚨 Alert sent & Trusted contacts notified!");
        } catch (error) {
          console.error("Alert API error:", error.response?.data || error.message);
          showAlert("Failed to send alert or notify contacts.");
        }
      };

      // ✅ Execute the async function inside the callback
      sendAlert();
    },
    () => {
      showAlert("Unable to retrieve your location.");
    }
  );
};
