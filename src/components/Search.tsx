import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaHome, FaNewspaper, FaBox, FaFlask, FaGraduationCap, FaEnvelope, FaRobot, FaUsers } from 'react-icons/fa';

interface SearchProps {
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ title: string; link: string }>>([]);

  const pages = [
    { title: "Home", link: "/" },
    { title: "Latest News", link: "/Latest" },
    { title: "Products", link: "/Products" },
    { title: "Research", link: "/Research" },
    { title: "Learning", link: "/Learning" },
    { title: "Contact", link: "/Contact" },
    { title: "GMTStudio AI WorkSpace", link: "https://gmt-studio-ai-workspace.vercel.app/" },
    { title: "Theta Social Media Platform", link: "https://theta-plum.vercel.app/" },
    // Add more pages as needed
  ];

  const handleSearch = useCallback(() => {
    const results = pages.filter(page =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, handleSearch]);

  const handleResultClick = (link: string) => {
    onClose();
    window.location.href = link;
  };

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'home': return <FaHome />;
      case 'latest news': return <FaNewspaper />;
      case 'products': return <FaBox />;
      case 'research': return <FaFlask />;
      case 'learning': return <FaGraduationCap />;
      case 'contact': return <FaEnvelope />;
      case 'gmtstudio ai workspace': return <FaRobot />;
      case 'theta social media platform': return <FaUsers />;
      default: return <FaSearch />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        className="bg-black bg-opacity-80 p-6 rounded-xl shadow-2xl w-full max-w-md border border-white border-opacity-30 backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b border-white border-opacity-30 pb-2">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaSearch className="mr-2 text-white" />
            Search
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 text-sm text-white bg-black bg-opacity-50 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all duration-300 placeholder-gray-400"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 text-sm" />
        </div>
        
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <h3 className="text-lg font-semibold mb-2 text-white border-b border-white border-opacity-30 pb-1">Results</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-2 border border-white border-opacity-30 rounded-lg text-white cursor-pointer hover:bg-white hover:bg-opacity-10 transition-colors duration-300 flex items-center group"
                    onClick={() => handleResultClick(result.link)}
                  >
                    <span className="mr-2 text-white text-opacity-70 group-hover:text-opacity-100 transition-colors duration-300">{getIcon(result.title)}</span>
                    <span className="text-sm">{result.title}</span>
                    <motion.span
                      className="ml-auto text-white text-opacity-0 group-hover:text-opacity-100 transition-opacity duration-300"
                      initial={{ x: -5 }}
                      animate={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Search;