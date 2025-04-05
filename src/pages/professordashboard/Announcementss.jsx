import React, { useState } from "react";
import SidePanelProf from "../../components/SidePanelProf";
const Announcementss = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Important Notice: Exam Tomorrow", date: "2025-04-01" },
    { id: 2, title: "New Study Material Released", date: "2025-04-03" },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnn = {
      id: announcements.length + 1,
      title: newAnnouncement,
      date: new Date().toLocaleDateString(),
    };
    setAnnouncements([...announcements, newAnn]);
    setNewAnnouncement("");
  };

  return (
    <div className="flex-1 p-6 bg-white bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>
      <SidePanelProf/>
      {/* Form to create a new announcement */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Create a new announcement..."
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Post Announcement
        </button>
      </form>

      {/* Display existing announcements */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p className="text-gray-500">{announcement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcementss;
