import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaGraduationCap, 
  FaBook, 
  FaTrophy, 
  FaQuestionCircle, 
  FaRobot,
  FaSignOutAlt,
  FaCog,
  FaChartLine,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user data
  const userName = "John Doe";
  const userInitial = userName.charAt(0);

  // Hide navbar on auth pages
  if (['/login', '/signup', '/forgot-password'].includes(location.pathname)) {
    return null;
  }

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeAllMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/subjects", name: "Subjects", icon: <FaBook className="mr-2" /> },
    { path: "/leaderboards", name: "Leaderboards", icon: <FaTrophy className="mr-2" /> },
    { path: "/quizzes", name: "Quizzes", icon: <FaQuestionCircle className="mr-2" /> },
    { path: "/ai-tutor", name: "AI Tutor", icon: <FaRobot className="mr-2" /> }
  ];

  const dropdownLinks = [
    { path: "/dashboard", name: "Dashboard", icon: <FaChartLine className="mr-2" /> },
    { path: "/profile", name: "Profile", icon: <FaUserCircle className="mr-2" /> },
    { path: "/settings", name: "Settings", icon: <FaCog className="mr-2" /> }
  ];

  const handleSignOut = () => {
    // Add sign out logic here
    navigate('/login');
    closeAllMenus();
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-3 border-b border-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden text-[#06B6D4] hover:text-[#3B82F6] focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
              
              <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center" onClick={closeAllMenus}>
  <FaGraduationCap className="h-8 w-8 text-[#06B6D4]" />
  <span className="ml-2 text-2xl font-extrabold text-[#06B6D4] hover:text-[#3B82F6] transition-colors duration-300">
    ImmerseLearn
  </span>
</Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === link.path ? 'bg-[#06B6D4] text-white' : 'text-gray-700 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4]'} transition-colors duration-300`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* User Profile - Desktop */}
            <div className="hidden md:block relative ml-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <div className="h-8 w-8 rounded-full bg-[#06B6D4] flex items-center justify-center text-white font-bold group-hover:bg-[#3B82F6] transition-colors duration-300">
                  {userInitial}
                </div>
                <span className="text-gray-700 font-medium group-hover:text-[#06B6D4] transition-colors duration-300">
                  {userName}
                </span>
                {isDropdownOpen ? (
                  <FaChevronUp className="text-gray-500 text-sm" />
                ) : (
                  <FaChevronDown className="text-gray-500 text-sm" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-gray-200 focus:outline-none overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-700">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                    </div>
                    {dropdownLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4] transition-colors duration-300"
                        onClick={closeAllMenus}
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-red-50 hover:text-red-500 border-t border-gray-100 transition-colors duration-300"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 mt-16 bg-white shadow-xl overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-3 rounded-lg text-base font-medium ${location.pathname === link.path ? 'bg-[#06B6D4] text-white' : 'text-gray-700 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4]'} transition-colors duration-300`}
                onClick={closeAllMenus}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="h-10 w-10 rounded-full bg-[#06B6D4] flex items-center justify-center text-white font-bold">
                {userInitial}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{userName}</div>
                <div className="text-sm text-gray-500">Free Account</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {dropdownLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4] transition-colors duration-300"
                  onClick={closeAllMenus}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content spacer to prevent navbar overlap */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;