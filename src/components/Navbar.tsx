import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900 dark:text-white">GMTStudio</div>
        <div className="flex">
          <a href="#hero" className="mx-2 text-gray-700 dark:text-gray-200">Home</a>
          <a href="#features" className="mx-2 text-gray-700 dark:text-gray-200">Features</a>
          <a href="#about" className="mx-2 text-gray-700 dark:text-gray-200">About Us</a>
          <a href="#projects" className="mx-2 text-gray-700 dark:text-gray-200">Projects</a>
          <a href="#testimonials" className="mx-2 text-gray-700 dark:text-gray-200">Testimonials</a>
          <a href="#blog" className="mx-2 text-gray-700 dark:text-gray-200">Blog</a>
          <a href="#contact" className="mx-2 text-gray-700 dark:text-gray-200">Contact</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
