import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name}!</h2>
      <p>This is your private dashboard.</p>
    </div>
  );
};

export default Dashboard;
