import React, { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

const AlertBox = () => {
  const { alert, setAlert } = useContext(AlertContext);

  if (!alert) return null;

  return (
    <div className="container mt-3">
      <div
        className={`alert alert-${alert.type || "primary"} alert-dismissible fade show d-flex justify-content-between align-items-center`}
        role="alert"
      >
        <span>{alert.message}</span>

        {/* X' close button */}
        <button
          onClick={() => setAlert(null)}
          className="btn btn-sm bg-transparent border-0 text-dark fs-3"
          style={{ lineHeight: "1" }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
