import React, { useState } from "react";
import { FaPaperPlane, FaCalendarAlt, FaTrash } from "react-icons/fa";
import SidePanelProf from "../../components/SidePanelProf";

const Announcementss = () => {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://immersilearn-backend.onrender.com/api/professor/announcements', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://immersilearn-backend.onrender.com/api/professor/announcements',
        newAnnouncement,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnnouncements([response.data, ...announcements]);
      setNewAnnouncement({ title: "", content: "" });
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };


  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: ""
  });

  
  
    
    const newAnn = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };
    
    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncement({ title: "", content: "" });
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Full-height Side Panel */}
      <div className="flex-shrink-0 h-screen sticky top-0">
        <SidePanelProf />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
         
            <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
            <p className="text-gray-500">Communicate important updates with your students</p>
          </div>

          {/* Create Announcement Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Announcement</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Announcement title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Announcement details..."
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FaPaperPlane className="mr-2" />
                Post Announcement
              </button>
            </form>
          </div>

          {/* Announcements List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Announcements</h2>
            
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                        <p className="text-gray-600 mb-4">{announcement.content}</p>
                      </div>
                      <button 
                        onClick={() => handleDelete(announcement.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete announcement"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span>Posted on {announcement.date}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-500">No announcements yet. Create your first announcement above.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcementss;
