// src/components/AlertButton.jsx
import React from 'react';
import { handleAlert } from '../utils/alertUtils'; // ✅ Import from utils

import  { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

const EmergencyButton = () => {
  const { showAlert } = useContext(AlertContext);

  const handleClick = () => {
    handleAlert(showAlert); // ✅ pass showAlert into util
  };

  return (
    <div className="text-center mt-5">
      <button className="btn btn-danger btn-lg" onClick={handleClick}>
        🚨 Trigger Emergency
      </button>
    </div>
  );
};

export default EmergencyButton;
