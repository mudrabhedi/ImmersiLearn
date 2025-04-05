import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";


const Signup = () => {
 const navigate = useNavigate(); // ← 2. Initialize it here
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://immersilearn-backend.onrender.com/api/auth/signup", formData);
      alert(res.data.message);
      navigate("/subjects"); // ← 3. Redirect after success
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#06B6D4] to-[#3B82F6]">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-xl px-10 py-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-[#20C997] hover:bg-teal-600 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-white">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-[#EB5757] underline hover:text-red-300 transition duration-150"
  >
    Log in
  </Link>
</p>

      </div>
      
    </div>
  );
};

export default Signup;
