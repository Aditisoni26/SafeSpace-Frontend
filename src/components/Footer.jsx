// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer  text-white pt-1 pb-1" style={{ backgroundColor: '#021526' }}>
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">SafeSpace</h5>
            <p>
              SafeSpace is your personal safety companion. Empowering women and men with real-time support, alerts, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold ">Quick Links</h5>
            <p><a href="#" className="text-white text-decoration-none">Home</a></p>
            <p><a href="#" className="text-white text-decoration-none">Features</a></p>
            <p><a href="#" className="text-white text-decoration-none">About</a></p>
            <p><a href="#" className="text-white text-decoration-none">Contact</a></p>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold ">Contact</h5>
            <p><i className="fas fa-home me-3"></i> Bhopal, India</p>
            <p><i className="fas fa-envelope me-3"></i> safespace@gmail.com</p>
            <p><i className="fas fa-phone me-3"></i> +91 98765 43210</p>
          </div>

        </div>

        {/* Footer Bottom */}
        <hr className="mb-4" />
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>© {new Date().getFullYear()} SafeSpace — All rights reserved.</p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <a href="#" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white me-4"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-4"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
