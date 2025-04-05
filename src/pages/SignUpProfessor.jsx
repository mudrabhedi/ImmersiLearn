import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupProfessor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    institution: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Try both possible endpoints
      const endpoints = [
        'https://immersilearn-backend.onrender.com/api/auth/signup', // Standard signup with role
        'https://immersilearn-backend.onrender.com/api/professors/register' // Alternative endpoint
      ];

      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          const res = await axios.post(
            endpoint,
            {
              ...formData,
              role: 'professor' // Send role with the request
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          localStorage.setItem('authToken', res.data.token);
          localStorage.setItem('userRole', 'professor');
          navigate("/professor/dashboard");
          return; // Exit if successful
        } catch (err) {
          lastError = err;
          console.warn(`Attempt failed for ${endpoint}:`, err.response?.status);
        }
      }

      throw lastError || new Error('All signup attempts failed');

    } catch (err) {
      console.error("Signup error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });

      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Professor registration failed. Please contact support.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] font-sans">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md transition duration-200">
        <h1 className="text-4xl font-extrabold text-center text-[#3B82F6] mb-2 tracking-wide">ImmerseLearn</h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Professor Registration</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <input
            type="email"
            name="email"
            placeholder="University Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#3B82F6] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register Professor'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3B82F6] font-medium">Login</Link>
          </p>
          <p className="mt-2 text-gray-600">
            Student registration?{' '}
            <Link to="/signup" className="text-[#10B981] font-medium">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupProfessor;