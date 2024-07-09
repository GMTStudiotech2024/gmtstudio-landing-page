import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLearnMoreClick = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.section
        id="hero"
        className={`min-h-screen flex items-start justify-end pt-10 pr-10 text-right relative bg-cover bg-center transition-background ${isDarkMode ? 'dark-mode-wallpaper' : 'light-mode-wallpaper'}`}
        aria-label="Hero section with background image"
        style={{
          backgroundPositionY: `${scrollY * 0.3}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative z-10 p-4 sm:p-8 max-w-4xl">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 sm:mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-indigo-400">GMTStudio</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Enhanced tools and applications to make your life easier.
          </motion.p>
          <motion.button
            onClick={handleLearnMoreClick}
            className="inline-flex items-center px-4 sm:px-8 py-2 sm:py-3 font-semibold rounded-lg shadow-lg bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Learn More
            <ChevronDown className="ml-2" size={20} />
          </motion.button>
        </div>
      </motion.section>
      <div ref={projectsRef} id="projects" className="bg-gray-900">
        {/* Projects content here */}
      </div>
    </>
  );
};

export default Hero;
