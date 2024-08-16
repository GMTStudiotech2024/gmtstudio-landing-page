import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaSearch, FaTimes, FaHome, FaNewspaper, FaBox, FaFlask, FaGraduationCap, FaEnvelope, FaRobot, FaUsers, FaPaperPlane, FaToggleOn, FaToggleOff, FaHistory, FaInfoCircle, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';
import { processChatbotQuery } from '../components/chatbot';

interface SearchProps {
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ title: string; link: string; isAIResponse?: boolean }>>([]);
  const [chatbotResponse, setChatbotResponse] = useState<string | null>(null);
  const [botResponse, setBotResponse] = useState<string | null>(null);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [wikiSearchResults, setWikiSearchResults] = useState<Array<{ title: string; snippet: string; pageid: number }>>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isResultsExpanded, setIsResultsExpanded] = useState(true);

  const pages = useMemo(() => [
    { title: "Home", link: "/" },
    { title: "Latest News", link: "/Latest" },
    { title: "Products", link: "/Products" },
    { title: "Research", link: "/Research" },
    { title: "Learning", link: "/Learning" },
    { title: "Contact", link: "/Contact" },
    { title: "GMTStudio AI WorkSpace", link: "https://gmt-studio-ai-workspace.vercel.app/" },
    { title: "Theta Social Media Platform", link: "https://theta-plum.vercel.app/" },
    // Add more pages as needed
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
    const chatResponse = await processChatbotQuery(searchTerm);
    setBotResponse(chatResponse);
    setSearchResults([{ title: 'Mazs AI v1.0 anatra mini', link: '#', isAIResponse: true }]);
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

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        className="bg-black bg-opacity-80 p-6 rounded-xl shadow-2xl w-full max-w-2xl border border-white border-opacity-30 backdrop-blur-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b border-white border-opacity-30 pb-2">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaSearch className="mr-2 text-white" />
            Search With Mazs AI
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="relative mb-4 group flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Type to Search or Ask a Question and wait for Mazs AI to answer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 pr-4 text-sm text-white bg-black bg-opacity-50 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 placeholder-gray-400 group-hover:border-opacity-50"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 text-sm" />
          </div>
          <motion.div 
            className="flex items-center space-x-3 ml-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10"
              title="Search History"
            >
              <FaHistory />
            </button>
            <button
              onClick={handleSendQuery}
              className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10"
              title="Send Query"
            >
              <FaPaperPlane />
            </button>
            <button
              onClick={toggleAdvancedSearch}
              className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200"
              title={isAdvancedSearch ? "Disable Advanced Search" : "Enable Advanced Search"}
            >
              {isAdvancedSearch ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
            </button>
          </motion.div>
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
              className="mt-4 bg-black bg-opacity-30 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white border-b border-white border-opacity-30 pb-1">Results</h3>
                <button
                  onClick={() => setIsResultsExpanded(!isResultsExpanded)}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <FaChevronDown className={`transform transition-transform duration-200 ${isResultsExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {isResultsExpanded && (
                <motion.ul 
                  className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar"
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
                      className="p-2 border border-white border-opacity-30 rounded-lg text-white cursor-pointer hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center group"
                      onClick={() => result.isAIResponse ? null : handleResultClick(result.link)}
                    >
                      <span className="mr-2 text-white text-opacity-70 group-hover:text-opacity-100 transition-colors duration-300">
                        {result.isAIResponse ? <FaRobot /> : getIcon(result.title)}
                      </span>
                      <span className="text-sm">{result.title}</span>
                      {result.isAIResponse && (
                        <p className="mt-2 text-sm text-white">{botResponse}</p>
                      )}
                      {!result.isAIResponse && (
                        <motion.span
                          className="ml-auto text-white text-opacity-0 group-hover:text-opacity-100 transition-opacity duration-300"
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
              <h3 className="text-lg font-semibold mb-2 text-white border-b border-white border-opacity-30 pb-1">Advanced Search Results</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {wikiSearchResults.map((result, index) => (
                  <motion.li
                    key={result.pageid}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-2 border border-white border-opacity-30 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
                  >
                    <h4 className="font-semibold flex items-center">
                      {result.title}
                      <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-blue-400 hover:text-blue-300">
                        <FaExternalLinkAlt />
                      </a>
                    </h4>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: result.snippet }} />
                  </motion.li>
                ))}
              </ul>
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
      </motion.div>
    </motion.div>
  );
};

export default Search;