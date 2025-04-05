import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaChartBar, FaClock, FaQuestionCircle } from "react-icons/fa";
import SidePanelProf from "../../components/SidePanelProf";

const Quizzess = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: "", description: "", duration: 30, totalQuestions: 10 });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/api/professor/quizzes")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setQuizzes(response.data);
        } else {
          console.error("Received data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching quizzes: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/professor/quizzes", newQuiz)
      .then((response) => {
        setQuizzes((prev) => [...prev, response.data]);
        setModalOpen(false);
        setNewQuiz({ title: "", description: "", duration: 30, totalQuestions: 10 });
      })
      .catch((error) => console.error("Error creating quiz: ", error));
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidePanelProf />
      
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#06B6D4] mb-2">Quizzes & Assignments</h2>
            <p className="text-gray-600">Create and manage assessments for your students</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="relative flex-grow md:w-64">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#06B6D4] hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 flex items-center justify-center whitespace-nowrap"
            >
              <FaPlus className="mr-2" />
              Create New Quiz
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#06B6D4]">
            <h3 className="text-gray-500 text-sm font-medium">Total Quizzes</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{quizzes.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm font-medium">Active Assignments</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">Avg. Completion</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">78%</p>
          </div>
        </div>

        {/* Quizzes List */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 ease-in-out border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <span className="flex items-center">
                    <FaClock className="mr-1" /> {quiz.duration || 30} mins
                  </span>
                  <span className="flex items-center">
                    <FaQuestionCircle className="mr-1" /> {quiz.totalQuestions || 10} Qs
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Link
                    to={`/professor/quiz/${quiz._id}`}
                    className="text-[#06B6D4] hover:text-teal-600 font-medium text-sm flex items-center"
                  >
                    View Details
                  </Link>
                  <div className="flex space-x-3">
                    <button 
                      className="text-gray-500 hover:text-blue-500 transition duration-200"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-red-500 transition duration-200"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-green-500 transition duration-200"
                      title="Analytics"
                    >
                      <FaChartBar size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No quizzes found</h3>
                <p className="text-gray-500">Try adjusting your search query</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No quizzes available</h3>
                <p className="text-gray-500 mb-4">Create your first quiz to get started</p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-[#06B6D4] hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-200"
                >
                  <FaPlus className="inline-block mr-2" />
                  Create Quiz
                </button>
              </>
            )}
          </div>
        )}

        {/* Modal for Creating New Quiz */}
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Create New Quiz</h3>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newQuiz.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                    placeholder="Enter quiz title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newQuiz.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                    placeholder="Enter quiz description"
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="duration">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      min="1"
                      value={newQuiz.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="totalQuestions">
                      Total Questions
                    </label>
                    <input
                      type="number"
                      id="totalQuestions"
                      name="totalQuestions"
                      min="1"
                      value={newQuiz.totalQuestions}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#06B6D4] hover:bg-teal-600 rounded-lg text-white transition duration-200"
                  >
                    Create Quiz
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzess;