import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe2, Play, Pause, Sun, Moon } from 'lucide-react';    

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFloating, setIsFloating] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "AI is included in this website. ",
    "The tech company that builds the future.",
    "Great, Marvelous, and Terrific.",
    "The size of this website is 2.6 GB ! "
  ];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    setIsVisible(currentScrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  }, []);

  const backgroundVariants = {
    floating: {
      y: [0, -20, 0],
      x: [0, 20, 0],
      transition: {
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      }
    },
    static: { y: 0, x: 0 }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('blog');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const letterVariants = {
    initial: { y: 0 },
    hover: { y: -10 },
  };

  return (
    <>
      <motion.section
        id="hero"
        className={`min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/path/to/your/optimized-infinity-background.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          variants={backgroundVariants}
          animate={isFloating ? "floating" : "static"}
        />
        <div className="relative z-10 p-6 sm:p-8 max-w-4xl w-full">
          <motion.div
            className="flex flex-col items-center mb-6 sm:mb-10"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Globe2 className={`w-14 h-14 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-6xl sm:text-6xl md:text-7xl font-extrabold ${isDarkMode ? 'text-white' : 'text-white'}`}>
              {"GMTStudio".split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  initial="initial"
                  whileHover="hover"
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              className={`text-lg sm:text-3xl md:text-4xl mb-6 sm:mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-300'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {slides[currentSlide]}
            </motion.p>
          </AnimatePresence>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
          </motion.div>
        </div>
        <motion.button
          className={`absolute bottom-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/20 hover:bg-white/30'}`}
          onClick={() => setIsFloating(!isFloating)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFloating ? <Pause size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} /> : <Play size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />}
        </motion.button>
        <motion.button
          className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/20 hover:bg-white/30'}`}
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-900" />}
        </motion.button>
      </motion.section>
      <motion.div
        className={`fixed bottom-8 right-8 bg-indigo-600 p-3 rounded-full ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <ChevronDown className="text-white transform rotate-180" size={24} />
      </motion.div>
    </>
  );
};

export default Hero;