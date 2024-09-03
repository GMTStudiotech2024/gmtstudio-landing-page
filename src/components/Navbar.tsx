import React, { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes, FaHome, FaFlask, FaBox, FaSearch, FaBell, FaQuestionCircle,  FaComments, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onSearchClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 0, message: "Search with Cmd+K", read: false, timestamp: new Date().toISOString() },
    { id: 1, message: "New feature released!", read: true, timestamp: new Date().toISOString() },
    { id: 2, message: "New product released.", read: true, timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, message: "Welcome to GMTStudio!", read: true, timestamp: new Date(Date.now() - 172800000).toISOString() },
  ]);
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrollPosition(window.pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Latest News', path: '/Latest', icon: <FaFlask /> },
    { name: 'Products', path: '/Products', icon: <FaBox /> },
    { name: 'System Status', path: '/system-status', icon: <FaComments /> },
  ];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      onSearchClick();
    }
  }, [onSearchClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.nav 
      style={{ opacity }}
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrollPosition > 50 ? 'bg-white/90 dark:bg-gray-900/90 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600"
        >
          <Link to="/">GMTStudio</Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center text-white dark:text-gray-200">
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.path} label={item.name} icon={item.icon} isActive={location.pathname === item.path} />
          ))}
          <SearchButton onSearchClick={onSearchClick} />
          <NotificationButton toggleNotificationMenu={toggleNotificationMenu} isNotificationOpen={isNotificationOpen} notifications={notifications} />
          <AuthButtons />
          <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <SearchButton onSearchClick={onSearchClick} />
          <NotificationButton toggleNotificationMenu={toggleNotificationMenu} isNotificationOpen={isNotificationOpen} notifications={notifications} />
          <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <button onClick={toggleMenu} className="text-xl text-white dark:text-white p-2" aria-label="Toggle menu">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden bg-white dark:bg-gray-900 shadow-md rounded-b-lg p-4 space-y-2"
          >
            {navItems.map((item) => (
              <NavLink key={item.name} href={item.path} label={item.name} icon={item.icon} isActive={location.pathname === item.path} />
            ))}
            <AuthButtons />
            <Link to="/advanced-search" className="flex px-3 py-2 rounded-md transition-colors duration-300 items-center text-blue-300 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900">
              <FaSearch className="mr-2" /> <span className="ml-2">Advanced Search</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileDropdown isProfileOpen={isProfileOpen} toggleProfileMenu={toggleProfileMenu} />
      <NotificationDropdown isNotificationOpen={isNotificationOpen} toggleNotificationMenu={toggleNotificationMenu} notifications={notifications} markAllAsRead={markAllAsRead} />

      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </motion.nav>
  );
};

const NavLink: React.FC<{ href: string; label: string; icon: React.ReactNode; isActive: boolean }> = ({ href, label, icon, isActive }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={href}
      className={`flex px-3 py-2 rounded-md transition-colors duration-300 items-center ${
        isActive ? 'bg-blue-500 text-white dark:bg-yellow-400 dark:text-gray-900' : 'text-blue-300 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900'
      }`}
    >
      {icon} <span className="ml-2 md:hidden lg:inline">{label}</span>
    </Link>
  </motion.div>
);

const SearchButton: React.FC<{ onSearchClick: () => void }> = ({ onSearchClick }) => (
  <button
    onClick={onSearchClick}
    className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-900 dark:hover:text-purple-200 transition-colors duration-300 rounded-md flex items-center"
    aria-label="AI Search"
  >
    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
    <span className="hidden md:inline">Search with AI</span>
  </button>
);

const AuthButtons: React.FC = () => (
  <div className="flex space-x-2">
    <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300">
      Log In
    </Link>
    <Link to="/signup" className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100 transition-colors duration-300">
      Sign Up
    </Link>
  </div>
);

const ProfileDropdown: React.FC<{ isProfileOpen: boolean; toggleProfileMenu: () => void }> = ({ isProfileOpen, toggleProfileMenu }) => (
  <AnimatePresence>
    {isProfileOpen && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0, y: -20, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{ duration: 0.2 }}
        className="absolute right-4 mt-4 bg-white dark:bg-gray-950 shadow-lg rounded-lg p-4 space-y-2 w-64"
      >
        <Link to="/help" className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 items-center rounded-md">
          <FaQuestionCircle className="mr-2" /> Help & Support
        </Link>
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
        <Link to="/Research" className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 items-center rounded-md">
          <FaFlask className="mr-2" /> Research
        </Link>
        <Link to="/Learning" className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 items-center rounded-md">
          <FaBox className="mr-2" /> Project Learning
        </Link>
        <Link to="/system-status" className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 items-center rounded-md">
          <FaBars className="mr-2" /> Systems Status
        </Link>
      </motion.div>
    )}
  </AnimatePresence>
);

const NotificationButton: React.FC<{ toggleNotificationMenu: () => void; isNotificationOpen: boolean; notifications: any[] }> = ({ toggleNotificationMenu, isNotificationOpen, notifications }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <button onClick={toggleNotificationMenu} className="flex p-2 text-white dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300 relative">
      <FaBell className={`w-5 h-5 ${isNotificationOpen ? 'text-blue-500 dark:text-yellow-400' : ''}`} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

const NotificationDropdown: React.FC<{ isNotificationOpen: boolean; toggleNotificationMenu: () => void; notifications: any[]; markAllAsRead: () => void }> = ({ isNotificationOpen, toggleNotificationMenu, notifications, markAllAsRead }) => (
  <AnimatePresence>
    {isNotificationOpen && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0, y: -20, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{ duration: 0.2 }}
        className="absolute right-4 mt-4 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-2xl p-4 space-y-2 w-80 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white text-lg">Notifications</h3>
          <button onClick={markAllAsRead} className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            Clear All
          </button>
        </div>
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No notifications</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 bg-white dark:bg-gray-700 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-gray-800 dark:text-white">GMTStudio</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={`text-sm ${notification.read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-white'}`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

const MegaMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg"
      >
        <div className="container mx-auto px-4 py-6 grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products/ai-workspace" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">AI Workspace</Link></li>
              <li><Link to="/products/data-analytics" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Data Analytics</Link></li>
              <li><Link to="/products/machine-learning" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Machine Learning</Link></li>
            </ul>
          </div>
          {/* Add more sections as needed */}
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <FaTimes />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-white dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300"
    >
      {isDarkMode ? (
        <FaSun className="w-5 h-5" />
      ) : (
        <FaMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default Navbar;