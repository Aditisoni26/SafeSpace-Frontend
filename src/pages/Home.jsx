import React, { useContext } from 'react';
import LiveMap from '../components/LiveMap';
import { handleAlert } from '../utils/alertUtils';
import { AlertContext } from '../context/AlertContext';
import UserNavLinks from '../components/UserNavLinks'; // ✅ Imported nav links

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { showAlert } = useContext(AlertContext);

  return (
    <div className="home-page">
      {/* Live Map + Alert Button */}
      <div className="live-map-container position-relative">
        <LiveMap />
        {user && (
          <button
            className="floating-alert-btn"
            title="Send Alert"
            onClick={() => handleAlert(showAlert)}
          >
            🚨
          </button>
        )}
      </div>

      {/* Welcome Section */}
      <div className="welcome-section text-center my-1">
        <h3>Welcome! You’re not alone — SafeSpace is your space. ❤️</h3>
        {!user && (
          <p className="text-danger">Please log in to use emergency features</p>
        )}
      </div>

      {/* Quick Access Section for Logged In Users */}
      {user && (
        <div className="container my-0">
          
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <UserNavLinks />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
