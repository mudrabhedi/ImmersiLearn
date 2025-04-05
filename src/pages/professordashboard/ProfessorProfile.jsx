import React, { useState } from 'react';
import { FiEdit, FiMail, FiPhone, FiCalendar, FiBook, FiAward, FiUsers, FiSettings } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUniversity, FaGraduationCap } from 'react-icons/fa';
import SidePanelProf from '../../components/SidePanelProf';
import { FiPlus } from 'react-icons/fi';  // Add this line

const ProfessorProfile = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    title: "Professor of Computer Science",
    email: "s.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    faculty: "Engineering",
    university: "Tech University",
    joinDate: "September 2015",
    office: "Building A, Room 305",
    bio: "Specialized in Artificial Intelligence and Machine Learning with over 10 years of teaching experience. Passionate about innovative teaching methods and student success.",
  });

  const [courses, setCourses] = useState([
    { id: 1, code: "CS401", name: "Advanced Machine Learning", semester: "Fall 2023", students: 42 },
    { id: 2, code: "CS305", name: "Data Structures", semester: "Spring 2023", students: 56 },
    { id: 3, code: "CS210", name: "Intro to AI", semester: "Winter 2023", students: 38 },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: "Best Professor Award", year: "2022", issuer: "University Board" },
    { id: 2, title: "Research Excellence", year: "2021", issuer: "Tech Foundation" },
    { id: 3, title: "Innovative Teaching", year: "2020", issuer: "Education Dept" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Full-height Side Panel */}
      <div className="flex-shrink-0 h-screen sticky top-0">
        <SidePanelProf />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-xl text-gray-600">{profile.title}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiEdit className="mr-2" />
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`flex items-center py-3 px-6 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChalkboardTeacher className="mr-2" />
              Overview
            </button>
            <button
              className={`flex items-center py-3 px-6 font-medium ${activeTab === 'courses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('courses')}
            >
              <FiBook className="mr-2" />
              Courses
            </button>
            <button
              className={`flex items-center py-3 px-6 font-medium ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('achievements')}
            >
              <FiAward className="mr-2" />
              Achievements
            </button>
            <button
              className={`flex items-center py-3 px-6 font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('settings')}
            >
              <FiSettings className="mr-2" />
              Settings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={profile.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={handleSave}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <FaChalkboardTeacher className="text-3xl" />
                        </div>
                        <div className="ml-6">
                          <p className="text-gray-700">{profile.bio}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center">
                          <FiMail className="text-gray-400 mr-3 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-800">{profile.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FiPhone className="text-gray-400 mr-3 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-800">{profile.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FaUniversity className="text-gray-400 mr-3 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">University</p>
                            <p className="text-gray-800">{profile.university}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FiCalendar className="text-gray-400 mr-3 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Joined</p>
                            <p className="text-gray-800">{profile.joinDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FaGraduationCap className="text-gray-400 mr-3 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Department</p>
                            <p className="text-gray-800">{profile.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FiUsers className="text-gray-400 mr-3 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Faculty</p>
                            <p className="text-gray-800">{profile.faculty}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Teaching Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Courses</p>
                      <p className="text-2xl font-bold text-gray-800">12</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Students Taught</p>
                      <p className="text-2xl font-bold text-gray-800">486</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Students</p>
                      <p className="text-2xl font-bold text-gray-800">136</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FiBook className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Created new quiz</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <FiAward className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Awarded student</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <FiMail className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sent announcement</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Courses</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.semester}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-800">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500">Showing {courses.length} of 12 courses</p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Add New Course
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
{activeTab === 'achievements' && (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Achievements</h2>
      
      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiAward className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{achievement.issuer}</p>
              <p className="text-xs text-gray-500">{achievement.year}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FiAward className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500">No achievements added yet</p>
        </div>
      )}
      
      <div className="mt-8">
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          onClick={() => console.log('Add achievement clicked')} // Add your handler
        >
          <FiPlus className="mr-2" />
          Add Achievement
        </button>
      </div>
    </div>
  </div>
)}
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      Update Password
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input type="checkbox" id="email-notifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">Email Notifications</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="app-notifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="app-notifications" className="ml-2 block text-sm text-gray-700">In-App Notifications</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="sms-notifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">SMS Notifications</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorProfile;
