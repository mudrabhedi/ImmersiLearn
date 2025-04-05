import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaTrophy, FaRobot, FaQuestionCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <FaGraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-indigo-800">ImmerseLearn</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/login" className="px-3 py-2 text-indigo-600 hover:text-indigo-800 font-medium">Login</Link>
              <Link to="/signup" className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Revolutionize Your Learning Experience</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore subjects through immersive AR experiences and interactive content designed to enhance understanding.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-lg transition">
            Get Started
          </Link>
          <Link to="/subjects" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium text-lg transition">
            Explore Subjects
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBook className="text-4xl text-indigo-600 mb-4" />,
                title: "Interactive Subjects",
                description: "Explore biology, chemistry, and more through 3D models and AR experiences."
              },
              {
                icon: <FaTrophy className="text-4xl text-indigo-600 mb-4" />,
                title: "Track Progress",
                description: "Monitor your learning journey with our achievement system and leaderboards."
              },
              {
                icon: <FaRobot className="text-4xl text-indigo-600 mb-4" />,
                title: "AI Tutor",
                description: "Get personalized help from our AI-powered tutor anytime."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-md transition">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students already experiencing immersive education with ImmerseLearn.
          </p>
          <Link to="/signup" className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-bold text-lg transition">
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FaGraduationCap className="h-6 w-6 text-indigo-400" />
              <span className="ml-2 text-lg font-bold">ImmerseLearn</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="hover:text-indigo-300">About</Link>
              <Link to="/contact" className="hover:text-indigo-300">Contact</Link>
              <Link to="/privacy" className="hover:text-indigo-300">Privacy</Link>
              <Link to="/terms" className="hover:text-indigo-300">Terms</Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-gray-400 text-sm">
            © {new Date().getFullYear()} ImmerseLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;