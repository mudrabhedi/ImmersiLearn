import React from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiAward, FiMessageSquare, FiFileText, FiUsers, FiBarChart2 } from 'react-icons/fi';

const SidePanelProf = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { id: "progress", icon: <FiUsers size={18} />, label: "Student Progress", path: "/professor/dashboard" },
    { id: "quizzes", icon: <FiBook size={18} />, label: "Quizzes & Assessments", path: "/professor/dashboard/quizzes" },
    { id: "leaderboard", icon: <FiAward size={18} />, label: "Class Leaderboard", path: "/professor/dashboard/leaderboard" },
    { id: "recognition", icon: <FiAward size={18} />, label: "Student Recognition", path: "/professor/dashboard/recognition" },
    { id: "announcements", icon: <FiMessageSquare size={18} />, label: "Messaging/Announcement", path: "/professor/dashboard/announcements" },
    { id: "resources", icon: <FiFileText size={18} />, label: "Resource Library", path: "/professor/dashboard/resources" },
    { id: "professorprofile", icon: <FiFileText size={18} />, label: "Profile", path: "/professor/dashboard/professorprofile" }
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static transition-transform duration-300 ease-in-out w-72 bg-white p-6 shadow-sm border-r border-gray-200 z-40 h-full overflow-y-auto`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">ImmerseLearn</h1>
          <p className="text-sm text-gray-500">Professor Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="mb-8">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidePanelProf;