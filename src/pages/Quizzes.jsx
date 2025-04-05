import React, { useState } from 'react';

const quizData = {
  biology: [
    { id: 1, title: "Cell Structure Quiz", description: "Learn about the structure and function of cells.", difficulty: "easy", questions: 10, points: 50 },
    { id: 2, title: "Photosynthesis Challenge", description: "Challenge your knowledge of photosynthesis and energy production.", difficulty: "medium", questions: 15, points: 100 },
    { id: 3, title: "Genetics and Heredity Quiz", description: "Explore the basics of genetics, inheritance, and mutations.", difficulty: "hard", questions: 20, points: 150 },
    { id: 4, title: "Human Body Systems Quiz", description: "Test your knowledge on the different systems of the human body.", difficulty: "easy", questions: 12, points: 60 },
    { id: 5, title: "Evolution Theory Challenge", description: "Dive into Charles Darwin's theory of evolution and natural selection.", difficulty: "medium", questions: 18, points: 120 },
  ],
  chemistry: [
    { id: 1, title: "Periodic Table Quiz", description: "Test your knowledge of the periodic table and its elements.", difficulty: "easy", questions: 10, points: 50 },
    { id: 2, title: "Chemical Reactions Challenge", description: "Identify and balance chemical reactions.", difficulty: "medium", questions: 15, points: 100 },
    { id: 3, title: "Atomic Structure Quiz", description: "Understand the structure of atoms, subatomic particles, and electron configuration.", difficulty: "hard", questions: 20, points: 150 },
    { id: 4, title: "Acids and Bases Challenge", description: "Learn the properties of acids and bases and their interactions.", difficulty: "easy", questions: 12, points: 60 },
    { id: 5, title: "Organic Chemistry Quiz", description: "Explore the basics of organic chemistry, including functional groups.", difficulty: "medium", questions: 18, points: 120 },
  ],
  space: [
    { id: 1, title: "Solar System Quiz", description: "Learn about the planets, moons, and other celestial bodies in our solar system.", difficulty: "easy", questions: 10, points: 50 },
    { id: 2, title: "Astronaut Training Challenge", description: "Take on challenges related to the physical and mental aspects of astronaut training.", difficulty: "medium", questions: 15, points: 100 },
    { id: 3, title: "Black Hole Physics Quiz", description: "Dive into the science of black holes, event horizons, and general relativity.", difficulty: "hard", questions: 20, points: 150 },
    { id: 4, title: "Rocket Science Challenge", description: "Learn about the fundamentals of rocket science and space travel.", difficulty: "medium", questions: 18, points: 120 },
    { id: 5, title: "Galaxies and Nebulas Quiz", description: "Test your knowledge of distant galaxies, nebulas, and the universe beyond.", difficulty: "hard", questions: 20, points: 150 },
  ],
};

const Quizzes = () => {
  const [selectedSubject, setSelectedSubject] = useState('space');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const startQuiz = (quiz) => {
    console.log(`Starting quiz: ${quiz.title}`);
    // Add your quiz start logic here
  };

  // Difficulty styling
  const difficultyStyles = {
    easy: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    hard: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  };

  // Filter quizzes based on selected options
  const filteredQuizzes = quizData[selectedSubject]
    .filter(quiz => selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty)
    .filter(quiz => quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  quiz.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Quizzes</h1>
          <p className="mt-2 text-gray-600">Test your knowledge across various subjects</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search quizzes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Subject and Difficulty Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="biology">Biology</option>
              <option value="chemistry">Chemistry</option>
              <option value="space">Space</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{quiz.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyStyles[quiz.difficulty].bg} ${difficultyStyles[quiz.difficulty].text} ${difficultyStyles[quiz.difficulty].border}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{quiz.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-4">
                    <span className="inline-flex items-center text-sm text-gray-500">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {quiz.questions} Qs
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-500">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {quiz.points} pts
                    </span>
                  </div>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No quizzes found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Leaderboard Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View All
            </button>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {[
                { rank: 1, name: "John Doe", points: 450, avatar: "JD" },
                { rank: 2, name: "Jane Smith", points: 420, avatar: "JS" },
                { rank: 3, name: "Alex Lee", points: 390, avatar: "AL" },
                { rank: 4, name: "Sam Wilson", points: 375, avatar: "SW" },
                { rank: 5, name: "Taylor Green", points: 360, avatar: "TG" },
              ].map((user) => (
                <li key={user.rank} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${user.rank === 1 ? 'bg-yellow-100 text-yellow-800' : user.rank === 2 ? 'bg-gray-100 text-gray-800' : user.rank === 3 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                        <span className="font-medium">{user.avatar}</span>
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.points} points</div>
                    </div>
                    <div className="ml-auto">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.rank === 1 ? 'bg-yellow-100 text-yellow-800' : user.rank === 2 ? 'bg-gray-100 text-gray-800' : user.rank === 3 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                        #{user.rank}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;