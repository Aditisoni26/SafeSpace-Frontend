// components/AutoLogout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiry = () => {
      const expiry = localStorage.getItem("expiry");
      const now = new Date().getTime();

      if (expiry && now > parseInt(expiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");
        alert(" Session expired. You have been logged out.");
        navigate("/login");
      }
    };

    checkExpiry(); // check immediately
    const interval = setInterval(checkExpiry, 5 * 60 * 1000); // every 5 mins

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // invisible
};

export default AutoLogout;
