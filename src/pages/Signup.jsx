import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../context/AlertContext'; 

const Signup = () => {
   const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);// ✅

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', formData);
      showAlert(res.data.message);
      navigate('/login'); // ✅ Redirect to home after signup
    } catch (error) {
      showAlert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" className="form-control my-2" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="form-control my-2" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="form-control my-2" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
