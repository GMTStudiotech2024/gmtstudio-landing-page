import React from 'react';

const Footer: React.FC = () => {
  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section bg-gray-900 py-8 text-white relative">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <img src="../public/favicon.ico" alt="GMTStudio Logo" className="mx-auto md:mx-0 w-32 h-auto mb-4 md:mb-0" />
            <p>&copy; 2024 GMTStudio TECH. All rights reserved. Website Version: 💻v1.6</p>
          </div>
          <div className="footer-links flex flex-wrap justify-center md:justify-end mt-4 md:mt-0 space-x-4">
            <a href="#Hero" className="footer-link" onClick={(e) => handleScroll(e, 'Hero')}>Home</a>
            <a href="#projects" className="footer-link" onClick={(e) => handleScroll(e, 'projects')}>Projects</a>            
            <a href="#features" className="footer-link" onClick={(e) => handleScroll(e, 'features')}>Features</a>
            <a href="#blog" className="footer-link" onClick={(e) => handleScroll(e, 'blog')}>Blog</a>            
            <a href="#about" className="footer-link" onClick={(e) => handleScroll(e, 'about')}>About Us</a>
            <a href="#testimonials" className="footer-link" onClick={(e) => handleScroll(e, 'testimonials')}>Testimonials</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
