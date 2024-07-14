import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission logic here
    setShowModal(true);
    setEmail('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <footer className="footer-section bg-gray-900 py-8 text-white relative">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <img
              src="../public/favicon.ico"
              alt="GMTStudio Logo"
              className="mx-auto md:mx-0 w-32 h-auto mb-4 md:mb-0"
            />
            <p>&copy; 2024 GMTStudio TECH. All rights reserved. Website Version: 💻v1.6</p>
          </div>
          <div className="footer-links flex flex-wrap justify-center md:justify-end mt-4 md:mt-0 space-x-4">
            <a href="#Hero" className="footer-link" onClick={(e) => handleScroll(e, 'Hero')}>
              Home
            </a>
            <a href="#projects" className="footer-link" onClick={(e) => handleScroll(e, 'projects')}>
              Projects
            </a>
            <a href="#features" className="footer-link" onClick={(e) => handleScroll(e, 'features')}>
              Features
            </a>
            <a href="#blog" className="footer-link" onClick={(e) => handleScroll(e, 'blog')}>
              Blog
            </a>
            <a href="#about" className="footer-link" onClick={(e) => handleScroll(e, 'about')}>
              About Us
            </a>
            <a
              href="#testimonials"
              className="footer-link"
              onClick={(e) => handleScroll(e, 'testimonials')}
            >
              Testimonials
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h4 className="text-lg font-bold mb-2">Subscribe to our newsletter</h4>
            <p className="text-gray-400">Stay updated with our latest news and offers</p>
          </div>
          <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row md:items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Thank you for subscribing!</h3>
              <p className="mb-4">You will receive updates and offers from GMTStudio TECH.</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;