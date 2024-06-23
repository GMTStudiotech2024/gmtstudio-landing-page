import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section
      id="hero"
      className={`pt-20 pb-10 h-screen flex items-center justify-center text-center relative ${isDarkMode ? 'dark-mode-wallpaper' : 'light-mode-wallpaper'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animated-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-white dark:text-white mb-6">
            Welcome to <span className="animated-gradient">GMTStudio</span>
          </h1>
          <h2 className="text-3xl mb-6 bg-gradient-to-r from-purple-500 to-purple-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Beyond Code, Beyond Limits.
          </h2>
          
          <p className="text-lg text-gray-300 dark:text-gray-300 mb-6">
            Enhanced Tools and applications to make your life easier.
          </p>
          <a href="#projects" className="inline-block px-8 py-3 font-semibold rounded-lg shadow-md bg-black dark:bg-white text-white dark:text-black transform transition-transform duration-500 hover:scale-105">
            Learn More
          </a>
        </div>
      </div>
      <div className="floating-card absolute top-1/2 right-4 transform -translate-y-1/2 p-4 w-64 h-36 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-solid border-white border-opacity-10 transition-transform duration-500 hover:scale-105">
        <h3 className="text-xl font-bold mb-2 text-white dark:text-white">Special Event</h3>
        <p className="text-sm text-white dark:text-gray-400 mb-2">
          Check out our latest tools and updates.
        </p>
        <a href="#special-feature" className="inline-block px-4 py-2 font-semibold rounded-lg bg-purple-500 text-white dark:bg-indigo-600 transition-transform duration-500 hover:scale-105">
          View Special Events
        </a>
      </div>
    </section>
  );
};

export default Hero;
