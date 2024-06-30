import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section bg-gray-400 dark:bg-gray-800 py-8 text-gray-900 dark:text-white">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 GMTStudio TECH. All rights reserved. Website Version: 💻v1.5</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#hero" className="footer-link">Home</a>
          <a href="#features" className="footer-link">Features</a>
          <a href="#about" className="footer-link">About Us</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#testimonials" className="footer-link">Testimonials</a>
          <a href="#blog" className="footer-link">Blog</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
