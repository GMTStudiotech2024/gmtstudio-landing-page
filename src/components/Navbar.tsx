import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-white to-white dark:from-slate-900 dark:to-slate-700 p-4 fixed w-full z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500">GMTStudio</div>
        <div className="hidden md:flex">
          <a href="#hero" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Home</a>
          <a href="a" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Research</a>
          <div className="relative group">
            <button className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Products</button>
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href="a" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">GMTStudio AI WorkSpace</a>
              <a href="a" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Theta Social Media PLatform </a>
              <a href="a" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">I don't know what is this yet </a>
            </div>
          </div>
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
          <a href="a" className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Research</a>
          <div className="relative">
            <button onClick={toggleProductsMenu} className="block w-full text-left px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">Products</button>
            {isProductsOpen && (
              <div className="mt-2 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg">
                <a href="a" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Product 1</a>
                <a href="a" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Product 2</a>
                <a href="a" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Product 3</a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
