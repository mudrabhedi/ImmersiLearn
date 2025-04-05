import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon from react-icons

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Mock user data (replace with actual user data or context)
  const userName = "John Doe";

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-[#06B6D4] p-4 shadow-lg">
      <div className="flex justify-between items-center">
        {/* ImmerseLearn logo */}
        <Link to="/" className="text-2xl font-extrabold text-white hover:text-[#3B82F6] transition-colors duration-300">
          ImmerseLearn
        </Link>

        {/* Navbar Links */}
        <div className="space-x-8 text-white text-lg font-semibold flex items-center">
          <Link to="/leaderboards" className="hover:text-[#3B82F6] transition-colors duration-300">Leaderboards</Link>
          <Link to="/quizzes" className="hover:text-[#3B82F6] transition-colors duration-300">Quizzes & Challenges</Link>
          <Link to="/levels-rewards" className="hover:text-[#3B82F6] transition-colors duration-300">Levels & Rewards</Link>
          <Link to="/ai-tutor" className="hover:text-[#3B82F6] transition-colors duration-300">AI Powered Tutor</Link>

          {/* User Profile and Dropdown */}
          <div className="relative inline-block text-white">
            <button 
              onClick={toggleDropdown} 
              className="flex items-center space-x-2 hover:text-[#3B82F6] transition-colors duration-300"
            >
              {/* User profile logo */}
              <FaUserCircle className="text-white text-2xl hover:text-[#3B82F6] transition-colors duration-300" />
              <span>{userName}</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-xl w-48 opacity-100 transform transition-all duration-300 ease-in-out">
                <div className="px-4 py-2">
                  <Link to="/dashboard" className="block px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#06B6D4] hover:text-white transition-colors duration-300">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#06B6D4] hover:text-white transition-colors duration-300">
                    Profile
                  </Link>
                  <button className="block w-full px-4 py-2 text-left rounded-lg text-sm font-medium hover:bg-[#EB5757] hover:text-white transition-colors duration-300">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
