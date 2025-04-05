import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://immersilearn-backend.onrender.com/api/auth/login", formData);
      alert(res.data.message);
      navigate("/subjects"); // ← 3. Redirect after success
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] font-sans">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md transition duration-200">
        <h1 className="text-4xl font-extrabold text-center text-[#3B82F6] mb-2 tracking-wide">
          ImmerseLearn
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Explore the world through AR learning</p>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Log In to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <button
            type="submit"
            className="w-full bg-[#20C997] hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-500 font-medium">— or continue with —</div>

        {/* Google Signup Button */}
        <div id="google-signin"></div>  {/* Google Sign-In button rendered here */}

        <p className="text-center text-gray-800 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#EF4444] underline hover:text-red-500 transition duration-150 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
