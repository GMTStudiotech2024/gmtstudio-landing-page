import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaHome, FaNewspaper, FaBox, FaFlask, FaGraduationCap, FaEnvelope, FaRobot, FaUsers, FaPaperPlane, FaToggleOn, FaToggleOff, FaHistory, FaInfoCircle, FaExternalLinkAlt, FaLightbulb, FaBookmark, FaTrash, FaVolumeUp } from 'react-icons/fa';
import { processChatbotQuery } from '../components/chatbot';

interface SearchProps {
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ title: string; link: string; isAIResponse?: boolean; response?: string }>>([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [wikiSearchResults, setWikiSearchResults] = useState<Array<{ title: string; snippet: string; pageid: number }>>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [bookmarks, setBookmarks] = useState<Array<{ title: string; link: string }>>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const results = pages.filter(page =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Process chatbot query
    const chatResponse = await processChatbotQuery(searchTerm);
    
    // Combine regular search results with AI response
    setSearchResults([
      ...results,
      { title: 'Mazs AI v1.0 anatra mini', link: '#', isAIResponse: true, response: chatResponse }
    ]);
    
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
    setIsLoading(false);
  }, [searchTerm, isAdvancedSearch, pages]);

  const handleSendQuery = async () => {
    setIsLoading(true);
    const chatResponse = await processChatbotQuery(searchTerm);
    setSearchResults([{ title: 'Mazs AI v1.0 anatra mini', link: '#', isAIResponse: true, response: chatResponse }]);
    setIsLoading(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    setShowHistory(false);
  };

  const toggleBookmark = (result: { title: string; link: string }) => {
    setBookmarks(prev => 
      prev.some(b => b.link === result.link)
        ? prev.filter(b => b.link !== result.link)
        : [...prev, result]
    );
  };

  const speakResult = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        className="bg-black bg-opacity-90 p-6 rounded-xl shadow-2xl w-full max-w-3xl border border-white border-opacity-30 backdrop-blur-sm"
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
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 pr-32 text-lg text-white bg-gray-900 border-2 border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 text-xl" />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200"
              title="Search History"
            >
              <FaHistory size={20} />
            </button>
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200"
              title="Bookmarks"
            >
              <FaBookmark size={20} />
            </button>
            <button
              onClick={handleSendQuery}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
              title="Send Query"
            >
              <FaPaperPlane className="mr-2" />
              Send
            </button>
          </div>
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
        
        {showBookmarks && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-gray-800 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-white">Bookmarks</h3>
              <button onClick={() => setBookmarks([])} className="text-xs text-gray-400 hover:text-white">Clear All</button>
            </div>
            <ul className="space-y-2">
              {bookmarks.map((bookmark, index) => (
                <li key={index} className="flex justify-between items-center text-sm text-gray-300 hover:text-white">
                  <a href={bookmark.link} className="flex-grow">{bookmark.title}</a>
                  <button onClick={() => toggleBookmark(bookmark)} className="text-red-500 hover:text-red-400">
                    <FaTrash size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="text-white text-sm">Advanced Search</span>
          <button
            onClick={toggleAdvancedSearch}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            {isAdvancedSearch ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
          </button>
        </div>
        
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-4"
            >
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            </motion.div>
          )}
          
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 bg-gray-900 rounded-lg p-4"
            >
              <h3 className="text-xl font-semibold mb-3 text-white border-b border-white border-opacity-30 pb-2">Results</h3>
              <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {searchResults.map((result, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 border border-white border-opacity-30 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center">
                        <span className="mr-2 text-white text-opacity-70">
                          {result.isAIResponse ? <FaRobot /> : getIcon(result.title)}
                        </span>
                        <span className="font-semibold">{result.title}</span>
                      </span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => toggleBookmark(result)} className="text-yellow-500 hover:text-yellow-400">
                          <FaBookmark size={16} />
                        </button>
                        <button onClick={() => speakResult(result.title)} className="text-blue-400 hover:text-blue-300">
                          <FaVolumeUp size={16} />
                        </button>
                        {!result.isAIResponse && (
                          <FaExternalLinkAlt className="text-white text-opacity-50 group-hover:text-opacity-100" />
                        )}
                      </div>
                    </div>
                    {result.isAIResponse && (
                      <p className="mt-2 text-sm text-white">{result.response}</p>
                    )}
                  </motion.li>
                ))}
              </ul>
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
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Search;