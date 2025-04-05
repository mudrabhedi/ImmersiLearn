import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#06B6D4] p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* ImmerseLearn logo */}
        <Link to="/" className="text-2xl font-extrabold text-white">
          ImmerseLearn
        </Link>

        {/* Navbar Links */}
        <div className="space-x-6 text-white text-lg">
          <Link to="/leaderboards" className="hover:text-[#3B82F6]">Leaderboards</Link>
          <Link to="/quizzes" className="hover:text-[#3B82F6]">Quizzes & Challenges</Link>
          <Link to="/levels-rewards" className="hover:text-[#3B82F6]">Levels & Rewards</Link>
          <Link to="/ai-tutor" className="hover:text-[#3B82F6]">AI Powered Tutor</Link>
          <Link to="/profile" className="hover:text-[#3B82F6]">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
