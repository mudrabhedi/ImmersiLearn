import React from "react";
import { useNavigate } from "react-router-dom";

const Subjects = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] text-white relative">
      {/* ImmerseLearn Text Logo */}
      <h1 className="absolute top-6 left-6 text-4xl font-extrabold text-[#3B82F6] tracking-wide">
        ImmerseLearn
      </h1>
      
      <h1 className="text-4xl font-extrabold text-center text-[#3B82F6] mb-10">Select a Subject</h1>
      <div className="flex flex-row gap-6">
        <button
          onClick={() => navigate("/subjects/biology")}
          className="px-6 py-3 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-[#20C997] text-gray-900 hover:text-white transition duration-200"
        >
          Biology
        </button>
        <button
          onClick={() => navigate("/subjects/chemistry")}
          className="px-6 py-3 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-[#20C997] text-gray-900 hover:text-white transition duration-200"
        >
          Chemistry
        </button>
        <button
          onClick={() => navigate("/subjects/space")}
          className="px-6 py-3 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-[#20C997] text-gray-900 hover:text-white transition duration-200"
        >
          Space
        </button>
      </div>
    </div>
  );
};

export default Subjects;
