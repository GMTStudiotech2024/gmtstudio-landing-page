import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">GMTStudio</h2>
            <p className="text-gray-400">Providing amazing services since 2024</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300 transition-colors duration-300">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300 transition-colors duration-300">About</a></li>
              <li><a href="/services" className="hover:text-gray-300 transition-colors duration-300">Services</a></li>
              <li><a href="/contact" className="hover:text-gray-300 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} GMTStudio All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;