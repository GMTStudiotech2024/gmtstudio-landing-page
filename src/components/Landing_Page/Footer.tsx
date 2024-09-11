import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const socialIcons = [Facebook, Twitter, Instagram, Mail];

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">GMTStudio</h2>
        <p className="text-gray-400 mb-4">Providing amazing services since 2024</p>
        
        <div className="flex justify-center space-x-4 mb-4">
          {socialIcons.map((Icon, index) => (
            <a key={index} href="#" className="hover:text-gray-300 transition-colors duration-300">
              <Icon size={20} />
            </a>
          ))}
        </div>

        <p>&copy; {currentYear} GMTStudio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;