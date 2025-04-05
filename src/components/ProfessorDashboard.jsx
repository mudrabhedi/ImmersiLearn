// ProfessorDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import SidePanelProf from "./SidePanelProf";
import { FaTachometerAlt, FaClipboardList, FaTrophy, FaBullhorn, FaBook, FaUserGraduate, FaChartLine, FaEnvelope } from 'react-icons/fa';
const ProfessorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("progress");

  useEffect(() => {
    axios
      .get("/api/professor/students")
      .then((response) => {
        const fetchedStudents = Array.isArray(response.data)
          ? response.data
          : [];
        setStudents(fetchedStudents);
      })
      .catch((error) => {
        console.error("There was an error fetching student data!", error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#06B6D4] text-white rounded-md shadow-lg"
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* SidePanel Component */}
      <SidePanelProf
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back, Professor</h1>
            <p className="text-gray-600 mb-6">Here's what's happening with your class today</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#F0FDFA] p-5 rounded-xl border border-[#CCFBF1]">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#06B6D4]/10 rounded-full">
                    <FaUserGraduate className="text-[#06B6D4]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-800">{students.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#ECFDF5] p-5 rounded-xl border border-[#D1FAE5]">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#10B981]/10 rounded-full">
                    <FaChartLine className="text-[#10B981]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Progress</p>
                    <p className="text-2xl font-bold text-gray-800">78%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#FEF2F2] p-5 rounded-xl border border-[#FEE2E2]">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#EF4444]/10 rounded-full">
                    <FaClipboardList className="text-[#EF4444]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Grading</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-xs">
                  <div className="p-2 bg-[#06B6D4]/10 rounded-full">
                    <FaUserGraduate className="text-[#06B6D4]" size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Johnson submitted Quiz #3</p>
                    <p className="text-sm text-gray-500">2 hours ago - 92% score</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-xs">
                  <div className="p-2 bg-[#10B981]/10 rounded-full">
                    <FaTrophy className="text-[#10B981]" size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Michael Chen reached top of leaderboard</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
