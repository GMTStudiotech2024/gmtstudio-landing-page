import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestion, FaEnvelope, FaBook, FaComments, FaTimes, FaSearch, FaArrowRight } from 'react-icons/fa';

const helpSections = [
  {
    title: 'FAQ',
    description: 'Find answers to commonly asked questions about our services and products.',
    icon: FaQuestion,
    content: 'Here you can find answers to frequently asked questions about our products and services. Browse through categories or use the search function to find specific information quickly.'
  },
  {
    title: 'Contact Support',
    description: 'Get in touch with our support team for personalized assistance.',
    icon: FaEnvelope,
    content: 'Our support team is available 24/7 to assist you. You can reach us via email at support@gmtstudio.com or call us at +1 (800) 123-4567. We aim to respond to all inquiries within 24 hours.'
  },
  {
    title: 'Documentation',
    description: 'Access detailed guides and documentation for our products.',
    icon: FaBook,
    content: 'Our comprehensive documentation covers everything from getting started guides to advanced features. You can find API references, tutorials, and best practices to make the most of our products.'
  },
  {
    title: 'Community Forum',
    description: 'Join our community forum to discuss and share ideas with other users.',
    icon: FaComments,
    content: 'Connect with other users, share your experiences, and get community support. Our forum is moderated by experts who can provide additional insights and solutions to common issues.'
  }
];

const Help: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState(helpSections);

  const handleSectionClick = (index: number) => {
    setSelectedSection(index);
  };

  const handleClose = () => {
    setSelectedSection(null);
  };

  useEffect(() => {
    const filtered = helpSections.filter(section =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSections(filtered);
  }, [searchTerm]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 pt-20"
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-5xl font-bold text-center mb-6 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Can We Help You?
        </motion.h1>
        <motion.p
          className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Find the answers you need or get in touch with our support team.
        </motion.p>
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-blue-500 focus:outline-none focus:border-blue-600 dark:bg-gray-700 dark:text-white text-lg"
            />
            <FaSearch className="absolute right-4 top-4 text-blue-500 text-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredSections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <div className="flex flex-col items-center mb-4">
                  <section.icon className="text-5xl text-blue-500 dark:text-blue-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">{section.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{section.description}</p>
              </div>
              <button 
                onClick={() => handleSectionClick(index)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Learn More</span>
                <FaArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedSection !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-3xl w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                <FaTimes size={24} />
              </button>
              <div className="flex items-center mb-6">
                {helpSections[selectedSection].icon({ className: "text-4xl text-blue-500 dark:text-blue-400 mr-4" })}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {helpSections[selectedSection].title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {helpSections[selectedSection].content}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Help;