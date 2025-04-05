import React, { useEffect, useState } from 'react';
import { FaTrophy, FaMedal } from 'react-icons/fa';  // Medal and Trophy icons

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Handle score submission
  const submitScore = async () => {
    if (!username || !score) return;

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
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 0) return <FaTrophy className="text-yellow-500" size={24} />;
    if (rank === 1) return <FaMedal className="text-gray-500" size={24} />;
    if (rank === 2) return <FaMedal className="text-gray-400" size={24} />;
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Leaderboard</h1>

      {/* Submit Score */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={submitScore}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Score
        </button>
      </div>

      {/* Display Leaderboard */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Score</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id || index} className="border-t hover:bg-gray-50">
                <td className="p-4 flex items-center">
                  {getRankIcon(index)}
                  <span className="ml-2">{index + 1}</span>
                </td>
                <td className="p-4">{entry.username}</td>
                <td className="p-4">{entry.score}</td>
                <td className="p-4">
                  {entry.date ? new Date(entry.date).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fun Section: Displaying Top 3 with Medals */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 3 Players</h2>
        <div className="flex justify-center gap-8">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div key={entry._id || index} className="flex flex-col items-center">
              {getRankIcon(index)}
              <div className="text-lg font-semibold">{entry.username}</div>
              <div className="text-sm">{entry.score} Points</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
