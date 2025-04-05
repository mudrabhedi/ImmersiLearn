import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert(res.data.message);
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#06B6D4] to-[#3B82F6]">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-xl px-10 py-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full bg-[#06B6D4] hover:bg-[#0891b2] text-white font-semibold py-2 rounded-md transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
