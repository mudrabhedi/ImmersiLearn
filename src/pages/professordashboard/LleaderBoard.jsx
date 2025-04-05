import React, { useState, useEffect } from 'react';
import SidePanelProf from '../../components/SidePanelProf';
import { FaCrown, FaMedal, FaTrophy, FaUserGraduate, FaSearch } from 'react-icons/fa';

const LleaderBoard = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', score: 95, level: 'Advanced', progress: 92, avatar: '/avatars/1.jpg' },
    { id: 2, name: 'Bob Smith', score: 89, level: 'Intermediate', progress: 87, avatar: '/avatars/2.jpg' },
    { id: 3, name: 'Charlie Brown', score: 82, level: 'Intermediate', progress: 79, avatar: '/avatars/3.jpg' },
    { id: 4, name: 'David Wilson', score: 76, level: 'Beginner', progress: 68, avatar: '/avatars/4.jpg' },
    { id: 5, name: 'Eva Davis', score: 72, level: 'Beginner', progress: 62, avatar: '/avatars/5.jpg' },
    { id: 6, name: 'Frank Miller', score: 68, level: 'Beginner', progress: 55, avatar: '/avatars/6.jpg' },
    { id: 7, name: 'Grace Taylor', score: 65, level: 'Beginner', progress: 50, avatar: '/avatars/7.jpg' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
  const fetchLeaderboardData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://immersilearn-backend.onrender.com/api/leaderboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }

      const data = await response.json();
      
      // Transform the API data to match your component's expected structure
      const formattedData = data.map((entry, index) => ({
        id: entry._id,
        name: entry.username,
        score: entry.score,
        level: getLevelFromScore(entry.score),
        progress: calculateProgress(entry.score),
        avatar: `/avatars/${(index % 7) + 1}.jpg` // Cycle through available avatars
      }));

      setStudents(formattedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // You might want to set some error state here to show to the user
    }
  };

  // Helper function to determine level based on score
  const getLevelFromScore = (score) => {
    if (score >= 90) return 'Advanced';
    if (score >= 70) return 'Intermediate';
    return 'Beginner';
  };

  // Helper function to calculate progress (assuming max score is 100)
  const calculateProgress = (score) => {
    return Math.min(100, Math.floor(score)); // Ensure progress doesn't exceed 100%
  };

  fetchLeaderboardData();
}, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankBadge = (rank) => {
    switch(rank) {
      case 0: return <FaCrown className="text-yellow-400 text-xl" />;
      case 1: return <FaMedal className="text-gray-300 text-xl" />;
      case 2: return <FaMedal className="text-amber-600 text-xl" />;
      default: return <span className="text-gray-500 font-medium">{rank + 1}</span>;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-shrink-0 h-screen sticky top-0">
        <SidePanelProf />
      </div>
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Class Leaderboard</h1>
          <p className="text-gray-600">Track student performance and achievements</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600">Advanced</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Intermediate</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Beginner</span>
              </div>
            </div>
          </div>

          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankBadge(index)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">ID: {student.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-amber-600' : 'bg-[#06B6D4]'}`} 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{student.progress}% completed</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {student.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getLevelColor(student.level)}`}>
                          {student.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <FaTrophy className="mx-auto text-gray-300 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No students found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search query</p>
            </div>
          )}

          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
              <span className="font-medium">{students.length}</span> students
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LleaderBoard;
