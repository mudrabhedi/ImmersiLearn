import React, { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
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
            className="w-full bg-[#0D9488] hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-white mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#EB5757] font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
