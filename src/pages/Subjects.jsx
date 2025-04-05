import React from "react";
import { useNavigate } from "react-router-dom";

const Subjects = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] text-white">
      <h1 className="text-4xl font-bold mb-10">Select a Subject</h1>
      <div className="grid grid-cols-1 gap-6">
        <button
          onClick={() => navigate("/subjects/biology")}
          className="px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 hover:bg-white/20 transition"
        >
          Biology
        </button>
        <button
          onClick={() => navigate("/subjects/chemistry")}
          className="px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 hover:bg-white/20 transition"
        >
          Chemistry
        </button>
        <button
          onClick={() => navigate("/subjects/space")}
          className="px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 hover:bg-white/20 transition"
        >
          Space
        </button>
      </div>
    </div>
  );
};

export default Subjects;
