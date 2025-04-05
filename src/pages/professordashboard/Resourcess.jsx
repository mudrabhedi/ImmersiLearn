import React, { useState } from 'react';
import { FiUpload, FiBook, FiFileText, FiCheckCircle, FiX } from 'react-icons/fi';
import SidePanelProf from '../../components/SidePanelProf';

const Resourcess = () => {
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://immersilearn-backend.onrender.com/api/professor/resources', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    isbn: '',
  });
  const [file, setFile] = useState(null);
  const [requestArVr, setRequestArVr] = useState(false);
  const [activeTab, setActiveTab] = useState('books');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleBookDetailsChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit');
      return;
    }
    setFile(selectedFile);
  };

  const handleRequestArVrChange = () => {
    setRequestArVr(!requestArVr);
  };

  

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'https://immersilearn-backend.onrender.com/api/professor/resources',
        { ...bookDetails, type: 'book' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle success
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUploadMaterial = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccessMessage(`"${file.name}" uploaded successfully!`);
    setFile(null);
    setIsSubmitting(false);
    setTimeout(() => setSuccessMessage(''), 5000);
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
            <h1 className="text-3xl font-bold text-gray-800">Resources</h1>
            
            <p className="text-gray-500">Add course materials and manage educational resources</p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`flex items-center py-4 px-6 font-medium text-sm ${activeTab === 'books' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('books')}
                >
                  <FiBook className="mr-2" />
                  Add Books
                </button>
                <button
                  className={`flex items-center py-4 px-6 font-medium text-sm ${activeTab === 'materials' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('materials')}
                >
                  <FiFileText className="mr-2" />
                  Upload Materials
                </button>
              </div>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mx-6 mt-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                <FiCheckCircle className="mr-2 text-green-500" />
                {successMessage}
              </div>
            )}

            {/* Content Area */}
            <div className="p-6">
              {/* Add Book Form */}
              {activeTab === 'books' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Book Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={bookDetails.title}
                        onChange={handleBookDetailsChange}
                        placeholder="Enter book title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={bookDetails.author}
                        onChange={handleBookDetailsChange}
                        placeholder="Enter author name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ISBN
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      value={bookDetails.isbn}
                      onChange={handleBookDetailsChange}
                      placeholder="Enter ISBN number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="arVrRequest"
                      checked={requestArVr}
                      onChange={handleRequestArVrChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="arVrRequest" className="ml-2 block text-sm text-gray-700">
                      Request AR/VR version of this book
                    </label>
                  </div>

                  <button
                    onClick={handleAddBook}
                    disabled={!bookDetails.title || !bookDetails.author || isSubmitting}
                    className={`w-full mt-4 px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                      !bookDetails.title || !bookDetails.author || isSubmitting
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Add Book to Library'
                    )}
                  </button>
                </div>
              )}

              {/* Upload Materials Form */}
              {activeTab === 'materials' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select File <span className="text-red-500">*</span>
                    </label>
                    <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, DOCX, PPTX (Max. 10MB)
                        </p>
                      </div>
                      <input 
                        type="file" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                      />
                    </label>
                    {file && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-blue-100">
                            <FiFileText className="text-blue-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setFile(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FiX />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="comments" className="font-medium text-gray-700">
                        Make available to students
                      </label>
                      <p className="text-gray-500">This material will be visible to all students in your course</p>
                    </div>
                  </div>

                  <button
                    onClick={handleUploadMaterial}
                    disabled={!file || isSubmitting}
                    className={`w-full mt-4 px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                      !file || isSubmitting
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      'Upload Study Material'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resourcess;
