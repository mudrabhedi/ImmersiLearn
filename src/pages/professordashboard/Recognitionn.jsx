import React from 'react';
import { FaTrophy, FaMedal, FaAward, FaPlus, FaStar, FaUserGraduate } from 'react-icons/fa';
import SidePanelProf from '../../components/SidePanelProf';

const Recognitionn = () => {
  const students = [
    {
      id: 1,
      name: "John Doe",
      score: 95,
      avatar: "/avatars/1.jpg",
      badges: [
        { name: "Top Scorer", icon: <FaTrophy className="mr-1" />, color: "from-yellow-400 to-yellow-500" },
        { name: "Best Collaborator", icon: <FaUserGraduate className="mr-1" />, color: "from-blue-400 to-blue-600" }
      ]
    },
    {
      id: 2,
      name: "Alex Johnson",
      score: 88,
      avatar: "/avatars/3.jpg",
      badges: [
        { name: "Fast Learner", icon: <FaStar className="mr-1" />, color: "from-purple-400 to-purple-600" },
        { name: "Consistent Performer", icon: <FaMedal className="mr-1" />, color: "from-green-400 to-green-600" }
      ]
    }
  ];

  const availableBadges = [
    { name: "Creative Thinker", icon: <FaAward />, color: "bg-pink-500" },
    { name: "Problem Solver", icon: <FaMedal />, color: "bg-teal-500" },
    { name: "Team Player", icon: <FaStar />, color: "bg-orange-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Panel */}
      <div className="flex-shrink-0 h-screen sticky top-0">
        <SidePanelProf />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-8">
        
          <h1 className="text-3xl font-bold text-gray-800">Student Recognition</h1>
          <p className="text-gray-500">Celebrate outstanding student achievements</p>
        </div>

        {/* Student Recognition Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {students.map((student) => (
            <div key={student.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Student Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{student.name}</h2>
                    <div className="flex items-center mt-2">
                      <div className="w-32 bg-white bg-opacity-30 rounded-full h-2 mr-3">
                        <div 
                          className="h-2 rounded-full bg-white" 
                          style={{ width: `${student.score}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-medium">{student.score}%</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <FaUserGraduate className="text-2xl" />
                  </div>
                </div>
              </div>

              {/* Badges Section */}
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  {student.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`bg-gradient-to-r ${badge.color} text-white text-sm px-3 py-1.5 rounded-full inline-flex items-center`}
                    >
                      {badge.icon}
                      {badge.name}
                    </span>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg transition-colors duration-200">
                  <FaPlus className="text-blue-500" />
                  <span className="font-medium">Award New Badge</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Available Badges Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableBadges.map((badge, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className={`${badge.color} w-14 h-14 rounded-full flex items-center justify-center text-white mb-4 mx-auto`}>
                  {badge.icon}
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-500 text-center">Click to award to student</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pb-4">
          <p className="font-medium">Immersed.com v1.0</p>
          <p>© 2023 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Recognitionn;