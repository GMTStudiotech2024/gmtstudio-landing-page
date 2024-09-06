import React, { useState, useEffect, useRef } from 'react';
import { processChatbotQuery, getConversationSuggestions } from './chatbot';
import { FaSearch, FaLightbulb, FaFilter, FaSort, FaImage, FaHistory, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedResult, setExpandedResult] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [wikiResults, setWikiResults] = useState<any[]>([]);
  const [typingResult, setTypingResult] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchType, setSearchType] = useState<'web' | 'images' | 'news'>('web');
  const [filters, setFilters] = useState({ date: '', language: '', region: '' });
  const [sortBy, setSortBy] = useState<'relevance' | 'date'>('relevance');
  const [imageResults, setImageResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSuggestions(getConversationSuggestions());
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const searchWikidata = async (query: string) => {
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json&origin=*`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.search;
    } catch (error) {
      console.error('Error fetching Wikidata:', error);
      return [];
    }
  };

  const searchWikimediaImages = async (query: string) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=imageinfo&iiprop=url&format=json&origin=*`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pages = data.query.pages;
      return Object.values(pages).map((page: any) => ({
        title: page.title,
        url: page.imageinfo[0].url,
      }));
    } catch (error) {
      console.error('Error fetching Wikimedia images:', error);
      return [];
    }
  };

  const summarizeResults = (chatbotResponse: string, wikiResults: any[]) => {
    let summary = `Here's a summary of the search results:\n\n`;
    summary += `${chatbotResponse}\n\n`;

    if (wikiResults.length > 0) {
      summary += "Additional relevant information from Wikidata:\n\n";
      wikiResults.slice(0, 5).forEach((item, index) => {
        summary += `${index + 1}. ${item.label}:\n   ${item.description}\n `;
      });
    }

    summary += "Key takeaways:\n";
    const keyPoints = chatbotResponse.split('.').filter(sentence => sentence.trim().length > 20).slice(0, 3);
    keyPoints.forEach((point, index) => {
      summary += `• ${point.trim()}.\n`;
    });

    summary += "\nRelated topics you might want to explore:\n";
    const relatedTopics = wikiResults.slice(0, 3).map(item => item.label);
    relatedTopics.forEach((topic, index) => {
      summary += `${index + 1}. ${topic}\n`;
    });

    summary += "\nNote: This summary combines AI-generated content and information from internet. For the most accurate and up-to-date information, please verify with authoritative sources.";

    return summary;
  };

  const simulateTyping = (text: string) => {
    setIsTyping(true);
    let i = 0;
    const typing = setInterval(() => {
      setTypingResult(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 20);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setTypingResult('');
    setImageResults([]);
    
    // Simulate different search types
    let searchResults;
    switch (searchType) {
      case 'web':
        searchResults = await processChatbotQuery(query);
        const wikiResults = await searchWikidata(query);
        const summarizedResult = summarizeResults(searchResults, wikiResults);
        setResults([summarizedResult]);
        simulateTyping(summarizedResult);
        break;
      case 'images':
        const images = await searchWikimediaImages(query);
        setImageResults(images);
        searchResults = `Found ${images.length} images related to "${query}"`;
        break;
      case 'news':
        searchResults = "News search results would appear here.";
        setResults([searchResults]);
        break;
    }

    setResults([searchResults]);
    setIsLoading(false);

    // Update search history
    const updatedHistory = [query, ...searchHistory.slice(0, 4)];
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const toggleResultExpansion = (index: number) => {
    setExpandedResult(expandedResult === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out pt-20">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center tracking-tight"
        >
          Mazs Search
        </motion.h1>
        <form onSubmit={handleSearch} className="mb-12 relative">
          <div className="flex items-center backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-full py-3 px-6 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg"
              placeholder="Search with AI..."
            />
            <motion.button
              type="submit"
              className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </motion.button>
          </div>
          
          {/* Search type selector */}
          <div className="flex justify-center mt-6 space-x-4">
            {['web', 'images', 'news'].map((type) => (
              <motion.button
                key={type}
                type="button"
                onClick={() => setSearchType(type as 'web' | 'images' | 'news')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${
                  searchType === type
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type === 'web' && <FaSearch className="inline-block mr-2" />}
                {type === 'images' && <FaImage className="inline-block mr-2" />}
                {type === 'news' && <FaHistory className="inline-block mr-2" />}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Filters and sorting */}
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full py-2 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white/70 dark:hover:bg-gray-700/70 transition duration-300"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {showFilters ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
            </button>
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                      <select
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Any time</option>
                        <option value="day">Past 24 hours</option>
                        <option value="week">Past week</option>
                        <option value="month">Past month</option>
                        <option value="year">Past year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date')}
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Date</option>
                      </select>
                    </div>
                    {/* Add more filter options here */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </form>

        {/* Results section */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden mb-12 transition-all duration-300"
            >
              <div className="px-6 py-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {searchType.charAt(0).toUpperCase() + searchType.slice(1)} Results
                </h3>
                <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {isTyping ? typingResult : results[0]}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>
                </div>
                {searchType === 'images' && imageResults.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {imageResults.slice(0, 3).map((image, index) => (
                      <motion.div 
                        key={index}
                        className="aspect-w-16 aspect-h-9"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img 
                          src={image.url} 
                          alt={image.title} 
                          className="w-full h-full object-cover rounded-lg shadow-md" 
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested Queries section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden transition-all duration-300 mb-12"
        >
          <div className="px-6 py-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Suggested Queries</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLightbulb className="mr-2" />
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search History section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden transition-all duration-300"
        >
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Search History</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition duration-300"
              >
                Clear History
              </button>
            </div>
            <ul className="space-y-3">
              {searchHistory.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleHistoryClick(item)}
                    className="text-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
                  >
                    {item}
                  </button>
                  <FaTimes
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                    onClick={() => {
                      const newHistory = searchHistory.filter((_, i) => i !== index);
                      setSearchHistory(newHistory);
                      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
                    }}
                  />
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
