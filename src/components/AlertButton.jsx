// src/components/AlertButton.jsx
import React, { useContext, useState } from "react";
import { handleAlert } from "../utils/alertUtils";
import { AlertContext } from "../context/AlertContext";

const EmergencyButton = () => {
  const { showAlert } = useContext(AlertContext);
  const [isSending, setIsSending] = useState(false);

  const handleClick = async () => {
    if (isSending) return;

    setIsSending(true);

    // 🔥 INSTANT FEEDBACK
    showAlert("🚨 Sending emergency alert...", "warning");

    try {
      await handleAlert(showAlert);
      // success alert is already shown inside handleAlert
    } finally {
      setTimeout(() => {
        setIsSending(false);
      }, 500); // prevent spam clicks
    }
  };

  return (
    <div className="text-center mt-5">
      <button
        className={`btn btn-lg ${
          isSending ? "btn-secondary" : "btn-danger"
        }`}
        onClick={handleClick}
        disabled={isSending}
        style={{
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          transform: isSending ? "scale(0.95)" : "scale(1)",
          boxShadow: isSending
            ? "0 0 25px rgba(255,0,0,0.8)"
            : "none",
        }}
      >
        {isSending ? "Sending..." : "🚨 Trigger Emergency"}
      </button>
    </div>
  );
};

export default EmergencyButton;
