// utils/trustedAlert.js
import axios from 'axios';

export const sendTrustedContactAlert = async (position, showAlert) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/emergency/my-alerts/send",
      { location: position },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showAlert(res.data.message); // ✅ Use passed-in showAlert
  } catch (err) {
    console.error("Error sending trusted alert:", err.response?.data || err.message);
    showAlert("Failed to alert trusted contacts.");
  }
};
