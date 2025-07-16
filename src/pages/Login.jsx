import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios'; // adjust path if inside deep folders
import { AlertContext } from '../context/AlertContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/login', formData); // ✅ no hardcoded localhost

      showAlert(res.data.message, 'success');

      // ✅ Save token and user
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // ✅ Save expiry time (1 hour from now)
      const expiryTime = new Date().getTime() + 3600000; // 1 hour in ms
      localStorage.setItem('expiry', expiryTime);

      navigate('/');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Login failed', 'danger');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-2"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-2"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
