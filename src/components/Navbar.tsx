import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes, FaSearch, FaUser, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsProductsOpen(false);
      setIsProfileOpen(false);
      setIsSearchOpen(false);
    }
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsProductsOpen(false);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsProductsOpen(false);
    setIsProfileOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600">
          GMTStudio
        </div>
        <div className="hidden lg:flex space-x-6 items-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/research" label="Research" />
          <div className="relative group">
            <button onClick={toggleProductsMenu} className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
              Products <FaChevronDown className="ml-1" />
            </button>
            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
                >
                  <ProductLink href="https://gmt-studio-ai-workspace.vercel.app/" label="GMTStudio AI WorkSpace" />
                  <ProductLink href="https://theta-plum.vercel.app/" label="Theta Social Media Platform" />
                  <ProductLink href="/our-projects" label="Project 3" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <SearchButton toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} />
          <ProfileButton toggleProfileMenu={toggleProfileMenu} isProfileOpen={isProfileOpen} />
          <ThemeToggle />
        </div>
        <div className="lg:hidden flex items-center space-x-4">
          <SearchButton toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} />
          <ProfileButton toggleProfileMenu={toggleProfileMenu} isProfileOpen={isProfileOpen} />
          <button onClick={toggleMenu} className="text-xl text-gray-900 dark:text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ThemeToggle />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="lg:hidden mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 space-y-2"
          >
            <NavLink href="/" label="Home" />
            <NavLink href="/research" label="Research" />
            <div className="relative">
              <button onClick={toggleProductsMenu} className="flex items-center w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
                Products <FaChevronDown className="ml-1" />
              </button>
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={menuVariants}
                    className="mt-2 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
                  >
                    <ProductLink href="https://gmt-studio-ai-workspace.vercel.app/" label="GMTStudio AI WorkSpace" />
                    <ProductLink href="https://theta-plum.vercel.app/" label="Theta Social Media Platform" />
                    <ProductLink href="/our-projects" label="Project 3" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchOverlay isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
      <ProfileOverlay isProfileOpen={isProfileOpen} toggleProfileMenu={toggleProfileMenu} />
    </nav>
  );
}

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">{label}</a>
);

const ProductLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">{label}</a>
);

const SearchButton: React.FC<{ toggleSearch: () => void; isSearchOpen: boolean }> = ({ toggleSearch, isSearchOpen }) => (
  <button onClick={toggleSearch} className="block p-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
    <FaSearch className={`w-5 h-5 ${isSearchOpen ? 'text-blue-500 dark:text-yellow-400' : ''}`} />
  </button>
);

const ProfileButton: React.FC<{ toggleProfileMenu: () => void; isProfileOpen: boolean }> = ({ toggleProfileMenu, isProfileOpen }) => (
  <button onClick={toggleProfileMenu} className="block p-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
    <FaUser className={`w-5 h-5 ${isProfileOpen ? 'text-blue-500 dark:text-yellow-400' : ''}`} />
  </button>
);

const SearchOverlay: React.FC<{ isSearchOpen: boolean; toggleSearch: () => void }> = ({ isSearchOpen, toggleSearch }) => (
  <AnimatePresence>
    {isSearchOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <input type="text" className="flex-grow p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200" placeholder="Search..." />
            <button onClick={toggleSearch} className="ml-2 p-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProfileOverlay: React.FC<{ isProfileOpen: boolean; toggleProfileMenu: () => void }> = ({ isProfileOpen, toggleProfileMenu }) => (
  <AnimatePresence>
    {isProfileOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h2>
            <button onClick={toggleProfileMenu} className="p-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <a href="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-300">Profile</a>
            <a href="/settings" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-300">Settings</a>
            <a href="/logout" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-300">Logout</a>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Navbar;