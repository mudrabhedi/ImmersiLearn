import React, { useEffect, useState } from 'react';
import { FaTrophy, FaMedal, FaCrown, FaUserAlt, FaCalendarAlt, FaSearch, FaRocket } from 'react-icons/fa';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leaderboard');
        if (!response.ok) {
         
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        
      }
    };

    fetchLeaderboard();
  }, []);

  // Handle score submission
  const submitScore = async () => {
    if (!username.trim() || !score) {
      setError('Please enter both username and score');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, score: parseInt(score) }),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setLeaderboard(prev => [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10));
        setUsername('');
        setScore('');
      } else {
        throw new Error('Failed to submit score');
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      setError('Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 0: return <FaCrown className="text-yellow-400 mr-2" />;
      case 1: return <FaTrophy className="text-gray-300 mr-2" />;
      case 2: return <FaTrophy className="text-amber-600 mr-2" />;
      default: return <span className="text-gray-500 font-medium mr-2">{rank + 1}</span>;
    }
  };

  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
    
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Leaderboard</h1>
      <p className="text-gray-600 mb-6">Compete with others and climb to the top!</p>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Score Submission */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button
          onClick={submitScore}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Score'}
        </button>
      </div>

      {/* Leaderboard Content */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Players</h3>
        
        {filteredLeaderboard.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center">
            <FaRocket className="mx-auto text-gray-400 text-4xl mb-4" />
            <p className="text-gray-600">No scores yet. Be the first to submit!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeaderboard.map((entry, index) => (
              <div 
                key={entry._id || index} 
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getRankIcon(index)}
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">
                        {entry.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{entry.username}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-1" />
                        {entry.date ? new Date(entry.date).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {entry.score} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;