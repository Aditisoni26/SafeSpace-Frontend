import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import EmergencyButton from "./components/EmergencyButton";
import MyAlerts from "./pages/MyAlerts";
import Home from "./pages/Home";
import AddTrustedContact from "./pages/AddTrustedContact";
import { AlertProvider } from "./context/AlertContext";
import AlertBox from "./components/AlertBox";
import AIChat from "./pages/AIChat";
import NearbySafeZones from "./components/NearbySafeZones";
import AutoLogout from "./components/AutoLogout"; // ✅
import "./App.css";

const EmergencyPage = () => (
  <h2 className="text-center mt-5">
    🚨 Emergency Page - Only for Logged In Users
  </h2>
);

const App = () => {
  return (
    <div className="app-container">
      <Header />

      <div className="main-content">
        <AlertProvider>
          <AutoLogout /> {/* ✅ This ensures session is monitored */}
          <AlertBox />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/trusted-contacts"
              element={
                <ProtectedRoute>
                  <AddTrustedContact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/emergency"
              element={
                <ProtectedRoute>
                  <EmergencyButton />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-alerts"
              element={
                <ProtectedRoute>
                  <MyAlerts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ai-chat"
              element={
                <ProtectedRoute>
                  <AIChat />
                </ProtectedRoute>
              }
            />

            <Route path="/nearby-safezones" element={<NearbySafeZones />} />
          </Routes>
        </AlertProvider>
      </div>

      <Footer />
    </div>
  );
};

export default App;
