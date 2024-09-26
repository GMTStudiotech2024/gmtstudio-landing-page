import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TbSparkles,TbEggCracked } from "react-icons/tb";

const LaunchMazsAI: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [error, setError] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false); // State to control Easter egg visibility
  const navigate = useNavigate();

  const languages = [
    { text: "Chat with MazsAI", lang: "English" },
    { text: "Chatea con MazsAI", lang: "Spanish" },
    { text: "與MazsAI聊天", lang: "Chinese" },
    { text: "MazsAIと会話する", lang: "Japanese" },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let text = '';
    let typingSpeed = 75;
    let pauseEnd = 2000;

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
        typingSpeed = 75;
        setTimeout(type, pauseEnd);
      } else if (isDeleting && text === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % languages.length;
        typingSpeed = 75;
        setTimeout(type, 500);
      } else {
        setTimeout(type, typingSpeed);
      }
    };

    type();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '/code') {
      // Trigger the Easter egg
      setShowEasterEgg(true);
      setSearchTerm('');
      setError('');
      return;
    }
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
              className="shadow-[0_0_30px_#3B82F6] w-full py-3 px-5 bg-white text-black dark:bg-black rounded-full dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-black dark:border-white focus:outline-none focus:ring-0 focus:border-transparent transition duration-300 ease-in-out focus:shadow-[0_0_30px_#3B82F6]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Ask MazsAI a question"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none rounded-full"
              aria-label="Submit question"
            >
              <TbSparkles className="w-6 h-6 dark:text-white dark:hover:text-gray-100 text-black hover:text-gray-900 transition-colors duration-200 " />
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

        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-white text-center ">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className="mb-5"
              >
                <TbEggCracked className="w-24 h-24 mx-auto" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                You found an easter egg! there are more hidden around the site.
              </motion.h2>
              <motion.p
                className="text-lg mb-8"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
              >
                clue : Searching for intelligent support   "is"   the answer.
              </motion.p>
              <button
                onClick={() => setShowEasterEgg(false)}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
        </motion.div>
      </div>
      <p className="text-[5px]">/code </p>
    </section>
  );
};

export default LaunchMazsAI;