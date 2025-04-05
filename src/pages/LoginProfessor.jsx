import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginProfessor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', formData);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login-professor", 
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Login response:', res);
      alert(res.data.message);
      localStorage.setItem('authToken', res.data.token);
      navigate("/professor-dashboard");
    } catch (err) {
      console.error('Login error:', {
        message: err.message,
        response: err.response,
        request: err.request,
        config: err.config
      });
      
      alert("Login failed: " + (
        err.response?.data?.message || 
        err.message || 
        'Unknown error occurred'
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] font-sans">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md transition duration-200">
        <h1 className="text-4xl font-extrabold text-center text-[#3B82F6] mb-2 tracking-wide">ImmerseLearn</h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Explore the world through AR learning</p>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Professor Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#20C997] hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginProfessor;