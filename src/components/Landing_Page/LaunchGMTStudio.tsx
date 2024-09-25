import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const LaunchMazsAI: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const languages = [
    { text: "Chat with MazsAI", lang: "English" },
    { text: "Chatea con MazsAI", lang: "Spanish" },
    { text: "Discutez avec MazsAI", lang: "French" },
    { text: "與MazsAI聊天", lang: "Chinese" },
    { text: "MazsAIと会話する", lang: "Japanese" },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let text = '';
    let typingSpeed = 200;
    let pauseEnd = 1000;

    const type = () => {
      const current = languages[currentIndex];
      if (isDeleting) {
        text = current.text.substring(0, text.length - 1);
      } else {
        text = current.text.substring(0, text.length + 1);
      }

      setDisplayText(text);

      if (!isDeleting && text === current.text) {
        isDeleting = true;
        typingSpeed = 100;
        setTimeout(type, pauseEnd);
      } else if (isDeleting && text === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % languages.length;
        typingSpeed = 100;
        setTimeout(type, 500);
      } else {
        setTimeout(type, typingSpeed);
      }
    };

    type();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setError('Please enter a question for MazsAI.');
      return;
    }
    setError('');
    // Navigate to /mazsai route with query
    navigate(`/mazsai?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4">
      <div className="max-w-4xl w-full mx-auto text-center space-y-8 px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 h-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="typewriter">{displayText}</span>
          <span className="cursor">|</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The world's first Artificial idiot
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Ask MazsAI a question..."
              className="w-full py-2 px-4 bg-white text-black dark:bg-black rounded-full dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-black dark:border-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Ask MazsAI a question"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              aria-label="Submit question"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
            </button>
          </div>
          {error && (
            <motion.p
              className="text-red-500 mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Additional UI elements can be added here */}
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchMazsAI;