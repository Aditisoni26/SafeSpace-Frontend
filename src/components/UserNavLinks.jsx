import React from 'react';
import { Link } from 'react-router-dom';

const UserNavLinks = () => {
  return (
    <>
      <Link className="btn btn-outline-primary" to="/trusted-contacts">👥 Trusted Contacts</Link>
      <Link className="btn btn-outline-danger" to="/emergency">🚨 Emergency</Link>
      <Link className="btn btn-outline-warning" to="/my-alerts">📢 My Alerts</Link>
      <Link className="btn btn-outline-info" to="/ai-chat">🤖 AI Chat</Link>
      <Link className="btn btn-outline-success" to="/nearby-safezones">🛡️ Nearby Safe Zones</Link>
    </>
  );
};

export default UserNavLinks;
