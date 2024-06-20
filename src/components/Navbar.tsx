import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes, FaSearch, FaUser } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="fixed w-full z-50 transition-transform duration-300 transform-gpu">
      <div className="container mx-auto p-4 flex justify-between items-center bg-gradient-to-r from-white to-white dark:from-slate-900 dark:to-slate-700 shadow-lg rounded-lg">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600">
          GMTStudio
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <a href="/" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Home</a>
          <a href="/research" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Research</a>
          <div className="relative group">
            <button className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Products</button>
            <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-900 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href="https://gmt-studio-ai-workspace.vercel.app/" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">GMTStudio AI WorkSpace</a>
              <a href="https://theta-plum.vercel.app/" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Theta Social Media Platform</a>
              <a href="/our-projects" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Project 3</a>
            </div>
          </div>
          <div className="relative">
            <button onClick={toggleSearch} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
              <FaSearch />
            </button>
            {isSearchOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
                <input type="text" className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200" placeholder="Search..." />
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
              <FaUser />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
                <a href="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Profile</a>
                <a href="/settings" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Settings</a>
                <a href="/logout" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Logout</a>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu} className="text-xl text-gray-900 dark:text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ThemeToggle />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 space-y-2 transition-transform duration-300 transform-gpu">
          <a href="/" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Home</a>
          <a href="/research" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Research</a>
          <div className="relative">
            <button onClick={toggleProductsMenu} className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Products</button>
            {isProductsOpen && (
              <div className="mt-2 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg">
                <a href="https://gmt-studio-ai-workspace.vercel.app/" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">GMTStudio AI WorkSpace</a>
                <a href="https://theta-plum.vercel.app/" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Theta Social Media Platform</a>
                <a href="/our-projects" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Project 3</a>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Profile</button>
            {isProfileOpen && (
              <div className="mt-2 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg">
                <a href="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Profile</a>
                <a href="/settings" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Settings</a>
                <a href="/logout" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Logout</a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
