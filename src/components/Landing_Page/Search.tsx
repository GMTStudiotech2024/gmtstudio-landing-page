import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaSearch, FaTimes, FaInfoCircle, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';
import { processChatbotQuery } from '../AI/MazsAI';

interface SearchProps {
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ title: string; link: string; isAIResponse?: boolean }>>([]);
  const [chatbotResponse, setChatbotResponse] = useState<string | null>(null);
  const [, setBotResponse] = useState<string | null>(null);
  const [isAdvancedSearch,] = useState(false);
  const [wikiSearchResults, setWikiSearchResults] = useState<Array<{ title: string; snippet: string; pageid: number }>>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isResultsExpanded, setIsResultsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const pages = useMemo(() => [
    { title: "Home", link: "/" },
    { title: "Latest News", link: "/Latest" },
    { title: "Products", link: "/Products" },
    { title: "Research", link: "/Research" },
    { title: "Learning", link: "/Learning" },
    { title: "Contact", link: "/Contact" },
    { title: "System Status", link: "/system-status" },
    { title: "I think you will use it so press this ", link: "https://www.google.com/" },
    { title: "GMTStudio AI WorkSpace", link: "https://gmt-studio-ai-workspace.vercel.app/" },
    { title: "Theta Social Media Platform", link: "https://theta-plum.vercel.app/" },
    { title: "Mazs AI Website Generator", link: "/website-builder" },
    { title: "Mazs AI", link: "https://mazs-ai-lab.vercel.app/" },
    { title: "Help", link: "/help" },
  ], []);

  const handleSearch = useCallback(async () => {
    const results = pages.filter(page =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);

    // Process chatbot query
    const chatResponse = await processChatbotQuery(searchTerm);
    setChatbotResponse(chatResponse);

    if (isAdvancedSearch) {
      const wikiApiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*&srlimit=5&srinfo=totalhits|suggestion|rewrittenquery`;
      try {
        const response = await fetch(wikiApiUrl);
        const data = await response.json();
        setWikiSearchResults(data.query.search);
      } catch (error) {
        console.error('Error fetching Wikipedia search results:', error);
      }
    }

    // Add search term to history
    setSearchHistory(prev => [searchTerm, ...prev.slice(0, 4)]);
  }, [searchTerm, isAdvancedSearch, pages]);

  const handleSendQuery = async () => {
    setIsLoading(true);
    setDisplayedResponse('');
    const chatResponse = await processChatbotQuery(searchTerm);
    setBotResponse(chatResponse);
    setSearchResults([{ title: 'Mazs AI v1.0 anatra mini', link: '#', isAIResponse: true }]);
    setIsLoading(false);
    setIsTyping(true);
    simulateTyping(chatResponse);
  };

  const simulateTyping = (text: string) => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedResponse(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30); // Adjust typing speed here
  };

  const clearHistory = () => {
    setSearchHistory([]);
    setShowHistory(false);
  };

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const LoadingDots = () => (
    <motion.div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-white rounded-full"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-md`}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-80 p-6 rounded-3xl shadow-lg w-full max-w-2xl backdrop-blur-xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} flex items-center`}>
            <FaSearch className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            Search
          </h2>
          <button
            onClick={onClose}
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="relative mb-6 group">
          <input
            type="text"
            placeholder="Search or ask a question"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-4 pl-12 pr-4 text-lg ${isDarkMode ? 'text-gray-200 bg-gray-800 placeholder-gray-500' : 'text-gray-800 bg-gray-100 placeholder-gray-400'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
          />
          <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-lg`} />
        </div>

        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-2 bg-gray-800 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-white">Search History</h3>
              <button onClick={clearHistory} className="text-xs text-gray-400 hover:text-white">Clear</button>
            </div>
            <ul className="space-y-1">
              {searchHistory.map((term, index) => (
                <li key={index} className="text-sm text-gray-300 hover:text-white cursor-pointer" onClick={() => setSearchTerm(term)}>
                  {term}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} bg-opacity-50 p-4 rounded-2xl shadow-md`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Results</h3>
                <button
                  onClick={() => setIsResultsExpanded(!isResultsExpanded)}
                  className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
                >
                  <FaChevronDown className={`transform transition-transform duration-200 ${isResultsExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {isResultsExpanded && (
                <motion.ul 
                  className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {searchResults.map((result, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      custom={index}
                      className={`p-3 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white bg-opacity-70 hover:bg-opacity-100'} rounded-xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} cursor-pointer transition-all duration-300 flex items-center group`}
                      onClick={() => result.isAIResponse ? null : handleResultClick(result.link)}
                    >
                      <span className={`mr-2 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-800'} transition-colors duration-300`}>
                        {result.isAIResponse ? <FaInfoCircle /> : <FaExternalLinkAlt />}
                      </span>
                      <span className="text-sm">{result.title}</span>
                      {result.isAIResponse && (
                        <div className="mt-2 text-sm text-gray-800">
                          {isLoading ? (
                            <div className="flex items-center">
                              <span className="mr-2">Mazs AI is thinking</span>
                              <LoadingDots />
                            </div>
                          ) : isTyping ? (
                            <>
                              <p>{displayedResponse}</p>
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                              >
                                |
                              </motion.span>
                            </>
                          ) : (
                            <p>{displayedResponse}</p>
                          )}
                        </div>
                      )}
                      {!result.isAIResponse && (
                        <motion.span
                          className={`ml-auto ${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'} transition-colors duration-300`}
                          initial={{ x: -5 }}
                          animate={{ x: 0 }}
                        >
                          →
                        </motion.span>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          )}
          {isAdvancedSearch && wikiSearchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b border-gray-200 pb-1">Advanced Search Results</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {wikiSearchResults.map((result, index) => (
                  <motion.li
                    key={result.pageid}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-2 border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <h4 className="font-semibold flex items-center">
                      {result.title}
                      <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-blue-400 hover:text-blue-300">
                        <FaExternalLinkAlt />
                      </a>
                    </h4>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: result.snippet }} />
                  </motion.li>
                ))}              </ul>
            </motion.div>
          )}
          {chatbotResponse && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-gray-800 rounded-lg relative border border-white border-opacity-20"
            >
              <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                Mazs AI v1.0 anatra mini
                <span className="ml-2 text-xs text-gray-400 cursor-help" title="AI-generated response">
                  <FaInfoCircle />
                </span>
              </h3>
              <p className="text-sm text-white">{chatbotResponse}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Dark mode toggle button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`mt-4 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
        >
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Search;