import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Results:</h3>
            <ul className="space-y-2">
              {searchResults.map((result, index) => (
                <li 
                  key={index} 
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleResultClick(result.link)}
                >
                  {result.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;