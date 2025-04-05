import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupProfessor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting signup with:', formData);
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup-professor",
        { ...formData, role: "professor" },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Signup response:', res);
      alert(res.data.message);
      if (res.data.token) {
        localStorage.setItem('authToken', res.data.token);
      }
      navigate("/professor-dashboard");
    } catch (err) {
      console.error('Signup error:', {
        message: err.message,
        response: err.response,
        request: err.request,
        config: err.config
      });
      
      alert("Signup failed: " + (
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

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Professor Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/30 text-gray-900 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
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
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupProfessor;