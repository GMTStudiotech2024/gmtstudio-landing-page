import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-white to-white dark:from-slate-900 dark:to-slate-700 p-4 fixed w-full z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500" >GMTStudio</div>
        <div className="hidden md:flex">
          <a href="#hero" className="mx-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Home</a>
          <a href="#features" className="mx-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Features</a>
          <a href="#about" className="mx-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">About Us</a>
          <a href="#projects" className="mx-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Projects</a>
          <a href="#testimonials" className="mx-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Testimonials</a>
          <a href="#blog" className="mx-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Blog</a>
          <a href="#contact" className="mx-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-xl text-gray-900 dark:text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ThemeToggle />
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
          <a href="#hero" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Home</a>
          <a href="#features" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Features</a>
          <a href="#about" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">About Us</a>
          <a href="#projects" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Projects</a>
          <a href="#testimonials" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Testimonials</a>
          <a href="#blog" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Blog</a>
          <a href="#contact" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
