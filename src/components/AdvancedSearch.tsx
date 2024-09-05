import React, { useState, useEffect, useRef } from 'react';
import { processChatbotQuery, getConversationSuggestions } from './chatbot';
import { FaSearch,  FaLightbulb,  FaFilter, FaSort, FaImage } from 'react-icons/fa';
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
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&prop=imageinfo&iiprop=url&format=json&origin=*`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return Object.values(data.query.pages);
    } catch (error) {
      console.error('Error fetching Wikimedia images:', error);
      return [];
    }
  };

  const summarizeResults = (chatbotResponse: string, wikiResults: any[]) => {
    let summary = chatbotResponse + "\n\n";
    if (wikiResults.length > 0) {
      summary += "Additionally, I found some relevant information:\n\n";
      wikiResults.slice(0, 3).forEach(item => {
        summary += `- ${item.label}: ${item.description}\n`;
      });
    }
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
        setResults([searchResults]);
        break;
      case 'news':
        searchResults = "News search results would appear here.";
        setResults([searchResults]);
        break;
    }

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
          AI-Powered Search Engine
        </h1>
        <form onSubmit={handleSearch} className="mb-8 relative">
          <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Search the web with AI..."
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {/* Search type selector */}
          <div className="flex justify-center mt-4 space-x-4">
            {['web', 'images', 'news'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSearchType(type as 'web' | 'images' | 'news')}
                className={`px-4 py-2 rounded-full ${
                  searchType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition duration-300`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Filters and sorting */}
          <div className="flex justify-between mt-4">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-400" />
              <select
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
              >
                <option value="">Any time</option>
                <option value="day">Past 24 hours</option>
                <option value="week">Past week</option>
                <option value="month">Past month</option>
                <option value="year">Past year</option>
              </select>
              {/* Add more filter options here */}
            </div>
            <div className="flex items-center space-x-4">
              <FaSort className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date')}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
              >
                <option value="relevance">Sort by relevance</option>
                <option value="date">Sort by date</option>
              </select>
            </div>
          </div>
        </form>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8 transition-colors duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  {searchType.charAt(0).toUpperCase() + searchType.slice(1)} Results
                </h3>
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
                    {isTyping ? typingResult : results[0]}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>
                </div>
                {searchType === 'images' && imageResults.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageResults.map((image: any, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.imageinfo[0].url}
                          alt={image.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <FaImage className="text-white text-2xl" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-300">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Suggested Queries</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLightbulb className="mr-1" />
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
