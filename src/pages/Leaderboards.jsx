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
        const response = await fetch('https://immersilearn-backend.onrender.com/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard. Please refresh.');
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
      const response = await fetch('https://immersilearn-backend.onrender.com/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, score: parseInt(score) }),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      const newEntry = await response.json();
      setLeaderboard(prev => [...prev, newEntry].sort((a, b) => b.score - a.score));
      setUsername('');
      setScore('');
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to submit score');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rank icons
  const getRankIcon = (rank) => {
    switch(rank) {
      case 0: return <FaCrown className="text-yellow-400 mr-2" />;
      case 1: return <FaTrophy className="text-gray-300 mr-2" />;
      case 2: return <FaTrophy className="text-amber-600 mr-2" />;
      default: return <span className="text-gray-500 font-medium mr-2">{rank + 1}</span>;
    }
  };

  // Filter leaderboard
  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Leaderboard</h1>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Score Submission */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Submit Your Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          onClick={submitScore}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Score'}
        </button>
      </div>

      {/* Leaderboard Display */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Top Players</h3>
        {filteredLeaderboard.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FaRocket className="mx-auto text-gray-400 text-4xl mb-4" />
            <p className="text-gray-600">No scores yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeaderboard.map((entry, index) => (
              <div key={entry._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getRankIcon(index)}
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      {entry.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium">{entry.username}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
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
