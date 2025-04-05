import React, { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

=======
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> 0db2340 (Updated signup page)

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Google Sign-In
  useEffect(() => {
    /* global google */
    window.google?.accounts?.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",  // Replace with your actual Client ID
      callback: handleGoogleResponse,
      ux_mode: 'popup',
    });

    window.google?.accounts?.id.renderButton(
      document.getElementById("google-signin"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post("https://immersilearn-backend.onrender.com/api/auth/google", {
        token: response.credential,
      });
      alert("Login successful!");
      localStorage.setItem('authToken', res.data.token);  // Store JWT in localStorage
      navigate("/subjects");
    } catch (err) {
      console.error(err);
      alert("Google Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://immersilearn-backend.onrender.com/api/auth/signup", formData);
      alert(res.data.message);
      navigate("/subjects");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Handle the token after Google login (from URL)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);  // Store token in localStorage
      alert('Google login successful!');
      navigate('/subjects');  // Redirect to subjects page
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] font-sans">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md transition duration-200">

        <h1 className="text-4xl font-extrabold text-center text-[#3B82F6] mb-2 tracking-wide">
          ImmerseLearn
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Explore the world through AR learning</p>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <button
            type="submit"
            className="w-full bg-[#20C997] hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </form>
<<<<<<< HEAD
        <p className="text-center text-white">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-[#EB5757] underline hover:text-red-300 transition duration-150"
  >
    Log in
  </Link>
</p>

=======

        {/* Divider */}
        <div className="my-6 text-center text-gray-500 font-medium">— or continue with —</div>

        {/* Google Signup Button */}
        <div id="google-signin"></div>  {/* Google Sign-In button rendered here */}

        <p className="text-center text-gray-800 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#EF4444] underline hover:text-red-500 transition duration-150 font-semibold"
          >
            Log in
          </Link>
        </p>
>>>>>>> 0db2340 (Updated signup page)
      </div>
    </div>
  );
};

export default Signup;
