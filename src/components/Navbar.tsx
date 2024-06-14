import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900 dark:text-white">GMTStudio</div>
        <div className="hidden md:flex">
          <a href="#hero" className="mx-2 text-gray-700 dark:text-gray-200">Home</a>
          <a href="#features" className="mx-2 text-gray-700 dark:text-gray-200">Features</a>
          <a href="#about" className="mx-2 text-gray-700 dark:text-gray-200">About Us</a>
          <a href="#projects" className="mx-2 text-gray-700 dark:text-gray-200">Projects</a>
          <a href="#testimonials" className="mx-2 text-gray-700 dark:text-gray-200">Testimonials</a>
          <a href="#blog" className="mx-2 text-gray-700 dark:text-gray-200">Blog</a>
          <a href="#contact" className="mx-2 text-gray-700 dark:text-gray-200">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-xl text-gray-900 dark:text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ThemeToggle />
      </div>
      {isOpen && (
        <div className="md:hidden mt-4">
          <a href="#hero" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Home</a>
          <a href="#features" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Features</a>
          <a href="#about" className="block px-2 py-1 text-gray-700 dark:text-gray-200">About Us</a>
          <a href="#projects" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Projects</a>
          <a href="#testimonials" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Testimonials</a>
          <a href="#blog" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Blog</a>
          <a href="#contact" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
