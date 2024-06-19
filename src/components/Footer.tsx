import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section bg-gray-400 dark:bg-gray-800 py-8 text-gray-900 dark:text-white">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 GMTStudio TECH. All rights reserved.  Website Version: 💻v1.1</p>
        <div className="flex justify-center mt-4">
          <a href="#hero" className="mx-2 text-gray-700 dark:text-gray-200">Home</a>
          <a href="#features" className="mx-2 text-gray-700 dark:text-gray-200">Features</a>
          <a href="#about" className="mx-2 text-gray-700 dark:text-gray-200">About Us</a>
          <a href="#projects" className="mx-2 text-gray-700 dark:text-gray-200">Projects</a>
          <a href="#testimonials" className="mx-2 text-gray-700 dark:text-gray-200">Testimonials</a>
          <a href="#blog" className="mx-2 text-gray-700 dark:text-gray-200">Blog</a>
          <a href="#contact" className="mx-2 text-gray-700 dark:text-gray-200">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
