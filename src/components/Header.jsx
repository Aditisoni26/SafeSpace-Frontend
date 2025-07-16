import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#021526' }} data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/image2.png" alt="Logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="mx-auto d-flex search-wrapper">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

        <ul className="navbar-nav ms-auto me-4 fw-semibold">
  {!user ? (
    <>
      <li className="nav-item">
        <Link className="nav-link text-center" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-center" to="/signup">Signup</Link>
      </li>
    </>
  ) : (
    <>
    <li className="nav-item">
  <Link className="nav-link text-center" to="/trusted-contacts">Trusted Contacts</Link>
</li>

      <li className="nav-item">
        <Link className="nav-link text-center" to="/emergency">Emergency</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-center" to="/my-alerts">My Alerts</Link>
      </li><li className="nav-item text-center">
  <Link className="nav-link" to="/ai-chat">AI Chat</Link>
</li>
<li><Link className="nav-link text-center" to="/nearby-safezones">Nearby Safe Zones</Link>
</li>
      <li className="nav-item">
        <Link
          to="#"
          className="nav-link text-center"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Logout
        </Link>
      </li>
      
    </>
  )}
</ul>


        </div>
      </div>
    </nav>
  );
};

export default Header;
