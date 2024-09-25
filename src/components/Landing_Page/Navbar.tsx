import React, { useState, useEffect, useCallback } from 'react';
import {
  FaBars, FaTimes, FaBell, FaChevronDown,
} from 'react-icons/fa';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { GiStripedSun } from 'react-icons/gi';
import { TbHomeSignal } from 'react-icons/tb';
import { LiaFlaskSolid } from 'react-icons/lia';
import { GrChat } from 'react-icons/gr';
import { FiCodesandbox } from "react-icons/fi";

interface NavbarProps {
  onSearchClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 0, message: 'Search with Cmd+K', read: false, timestamp: new Date().toISOString() },
    { id: 1, message: 'New feature released!', read: true, timestamp: new Date().toISOString() },
    { id: 2, message: 'New product released.', read: true, timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, message: 'Welcome to GMTStudio!', read: true, timestamp: new Date(Date.now() - 172800000).toISOString() },
  ]);
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);

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
    setIsNotificationOpen(false);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <TbHomeSignal /> },
    { name: 'Latest News', path: '/Latest', icon: <LiaFlaskSolid /> },
    {
      name: 'Products',
      path: '/Products',
      icon: <FiCodesandbox />,
      isDropdown: true,
      subItems: [
        { name: 'Mazs AI lab preview', path: '/mazsai' },
        { name: 'Mazs AI', path: 'https://mazs-ai-lab.vercel.app/' },
      ],
    },
    { name: 'Mazs AI', path: '/mazsai', icon: <GrChat /> },
  ];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        onSearchClick();
      }
    },
    [onSearchClick]
  );

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
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600"
        >
          <Link to="/" aria-label="GMTStudio Home">GMTStudio</Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center text-blue-800 dark:text-gray-200">
          {navItems.map((item) =>
            item.isDropdown ? (
              <DropdownMenu key={item.name} item={item} isActive={location.pathname === item.path} />
            ) : (
              <NavLink key={item.name} href={item.path} label={item.name} icon={item.icon} isActive={location.pathname === item.path} />
            )
          )}
          <SearchInput onSearchClick={onSearchClick} />
          <NotificationButton toggleNotificationMenu={toggleNotificationMenu} isNotificationOpen={isNotificationOpen} notifications={notifications} />
          <AuthButtons />
          <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button onClick={toggleMenu} className="text-xl text-blue-800 dark:text-white p-2" aria-label="Toggle menu" aria-expanded={isOpen}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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
            {navItems.map((item) =>
              item.isDropdown ? (
                <DropdownMenu key={item.name} item={item} isActive={location.pathname.startsWith('/Products')} isMobile />
              ) : (
                <NavLink key={item.name} href={item.path} label={item.name} icon={item.icon} isActive={location.pathname === item.path} />
              )
            )}
            <SearchInput onSearchClick={onSearchClick} isMobile />
            <AuthButtons isMobile />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Dropdown */}
      <NotificationDropdown
        isNotificationOpen={isNotificationOpen}
        toggleNotificationMenu={toggleNotificationMenu}
        notifications={notifications}
        markAllAsRead={markAllAsRead}
      />
    </motion.nav>
  );
};

// NavLink Component
const NavLink: React.FC<{ href: string; label: string; icon?: React.ReactNode; isActive: boolean }> = ({
  href,
  label,
  icon,
  isActive,
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={href}
      aria-current={isActive ? 'page' : undefined}
      className={`flex px-3 py-2 rounded-md transition-colors duration-300 items-center ${
        isActive
          ? 'bg-blue-500 text-white dark:bg-yellow-400 dark:text-gray-900'
          : 'text-blue-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900'
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </Link>
  </motion.div>
);

// DropdownMenu Component
const DropdownMenu: React.FC<{
  item: any;
  isActive: boolean;
  isMobile?: boolean;
}> = ({ item, isActive, isMobile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        onClick={() => isMobile && setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 ${
          isActive
            ? 'bg-blue-500 text-white dark:bg-yellow-400 dark:text-gray-900'
            : 'text-blue-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900'
        }`}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <span>{item.name}</span>
        <FaChevronDown className="ml-1" />
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="absolute mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md z-50"
          >
            <ul className="py-2">
              {item.subItems.map((subItem: any) => (
                <li key={subItem.name}>
                  <Link
                    to={subItem.path}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900"
                  >
                    {subItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// SearchInput Component
const SearchInput: React.FC<{ onSearchClick: () => void; isMobile?: boolean }> = ({ onSearchClick, isMobile }) => {
  return (
    <div className={`relative ${isMobile ? 'mt-2' : ''}`}>
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none w-full"
      />
      <button
        onClick={onSearchClick}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        aria-label="AI Search"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      </button>
    </div>
  );
};

// AuthButtons Component
const AuthButtons: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => (
  <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
    <Link
      to="/login"
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
    >
      Log In
    </Link>
    <Link
      to="/signup"
      className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100 transition-colors duration-300"
    >
      Sign Up
    </Link>
  </div>
);

// NotificationButton Component
const NotificationButton: React.FC<{
  toggleNotificationMenu: () => void;
  isNotificationOpen: boolean;
  notifications: any[];
}> = ({ toggleNotificationMenu, isNotificationOpen, notifications }) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <button
      onClick={toggleNotificationMenu}
      className="relative p-2 text-blue-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300"
      aria-label="Notifications"
      aria-expanded={isNotificationOpen}
    >
      <FaBell className={`w-5 h-5 ${isNotificationOpen ? 'text-blue-500 dark:text-yellow-400' : ''}`} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

// NotificationDropdown Component
const NotificationDropdown: React.FC<{
  isNotificationOpen: boolean;
  toggleNotificationMenu: () => void;
  notifications: any[];
  markAllAsRead: () => void;
}> = ({ isNotificationOpen, toggleNotificationMenu, notifications, markAllAsRead }) => (
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
        className="absolute right-4 mt-4 bg-white dark:bg-gray-950 shadow-lg rounded-lg p-4 space-y-2 w-80 max-h-[80vh] overflow-y-auto z-50"
        role="region"
        aria-label="Notifications"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white text-lg">Notifications</h3>
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Mark All as Read
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
                className={`p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
                  notification.read ? 'border-gray-200 dark:border-gray-700' : 'border-blue-500 dark:border-yellow-400'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-gray-800 dark:text-white">GMTStudio</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        notification.read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-white'
                      }`}
                    >
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

// ThemeToggle Component
interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-blue-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <GiStripedSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <BsFillMoonStarsFill className="w-5 h-5" />
      )}
    </button>
  );
};

export default Navbar;