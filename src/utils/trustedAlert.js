// utils/trustedAlert.js
import API from '../utils/axios'; // adjust path if inside deep folders

export const sendTrustedContactAlert = async (position, showAlert) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.post(
      "/api/emergency/my-alerts/send",
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
