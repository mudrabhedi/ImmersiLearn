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
        { name: "Top Scorer", icon: <FaTrophy className="mr-1" />, color: "bg-yellow-100 text-yellow-800" },
        { name: "Best Collaborator", icon: <FaAward className="mr-1" />, color: "bg-blue-100 text-blue-800" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      score: 90,
      avatar: "/avatars/2.jpg",
      badges: [
        { name: "Best Presentation", icon: <FaMedal className="mr-1" />, color: "bg-purple-100 text-purple-800" },
        { name: "Quiz Master", icon: <FaStar className="mr-1" />, color: "bg-green-100 text-green-800" }
      ]
    },
    {
      id: 3,
      name: "Alex Johnson",
      score: 88,
      avatar: "/avatars/3.jpg",
      badges: [
        { name: "Fast Learner", icon: <FaAward className="mr-1" />, color: "bg-red-100 text-red-800" },
        { name: "Consistent Performer", icon: <FaStar className="mr-1" />, color: "bg-indigo-100 text-indigo-800" }
      ]
    }
  ];

  const availableBadges = [
    { name: "Creative Thinker", icon: <FaAward />, color: "bg-pink-100 text-pink-800" },
    { name: "Problem Solver", icon: <FaMedal />, color: "bg-teal-100 text-teal-800" },
    { name: "Team Player", icon: <FaStar />, color: "bg-orange-100 text-orange-800" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <SidePanelProf/>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Professor Dashboard</h1>
          <p className="text-xl text-gray-600 mt-2">Student Recognition</p>
          <p className="text-gray-500">Celebrate outstanding student achievements</p>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {students.map((student, index) => (
            <div key={student.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Student Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{student.name}</h3>
                    <div className="flex items-center">
                      <div className="w-20 bg-white bg-opacity-30 rounded-full h-1.5 mr-2">
                        <div 
                          className="h-1.5 rounded-full bg-white" 
                          style={{ width: `${student.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{student.score}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {student.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center ${badge.color} text-xs px-2 py-1 rounded-full`}
                    >
                      {badge.icon}
                      {badge.name}
                    </span>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">
                  <FaPlus className="text-blue-500" />
                  <span>Award New Badge</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Available Badges */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {availableBadges.map((badge, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`${badge.color} w-10 h-10 rounded-full flex items-center justify-center mb-2`}>
                  {badge.icon}
                </div>
                <h3 className="font-medium text-gray-800">{badge.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Click to award to student</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Immersed.com v1.0</p>
          <p>© 2023 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Recognitionn;