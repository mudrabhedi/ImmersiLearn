import React from "react";
import { useNavigate } from "react-router-dom";
import { FaAtom, FaDna, FaRocket, FaGraduationCap } from "react-icons/fa";

const Subjects = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Biology",
      icon: <FaDna className="text-3xl text-green-500" />,
      color: "bg-green-100 hover:bg-green-50",
      border: "border-green-200",
      path: "/subjects/biology"
    },
    {
      name: "Chemistry",
      icon: <FaAtom className="text-3xl text-blue-500" />,
      color: "bg-blue-100 hover:bg-blue-50",
      border: "border-blue-200",
      path: "/subjects/chemistry"
    },
    {
      name: "Space",
      icon: <FaRocket className="text-3xl text-purple-500" />,
      color: "bg-purple-100 hover:bg-purple-50",
      border: "border-purple-200",
      path: "/subjects/space"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] p-6">
      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Subject</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a subject to explore interactive lessons, quizzes, and learning materials.
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              onClick={() => navigate(subject.path)}
              className={`cursor-pointer rounded-xl p-6 border-2 ${subject.border} ${subject.color} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col items-center`}
            >
              <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                {subject.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-center">
                {subject.name === "Biology" && "Explore life sciences and organisms"}
                {subject.name === "Chemistry" && "Discover elements and reactions"}
                {subject.name === "Space" && "Journey through the cosmos"}
              </p>
              <button className="mt-4 px-4 py-2 bg-white text-[#3B82F6] rounded-lg font-medium border border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-colors">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ImmerseLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Subjects;