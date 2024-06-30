import React, { useEffect, useState } from 'react';

const HeroProminent: React.FC = () => {
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
      className={`pt-20 pb-10 h-screen flex place-items-center justify-center text-center relative ${isDarkMode ? 'dark-mode-wallpaper' : 'light-mode-wallpaper'}`}
    >
      <div className="absolute top-4 right-4 text-right mt-14">
        <div className="animated-fade-in-up">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-8 text-shadow-lg">
            Welcome to <span className="text-white">GMTStudio</span>
          </h1>
          <h2 className="text-3xl mb-6 animated-gradient-b text-shadow-lg">
            Beyond Code, Beyond Limits.
          </h2>
          <p className="text-2xl text-gray-300 mb-6 text-shadow-lg">
            Enhanced Tools and applications to make your life easier.
          </p>
          <a href="#projects" className="inline-block px-10 py-4 font-semibold rounded-lg shadow-md bg-black dark:bg-white text-white dark:text-black transform transition-transform duration-500 hover:scale-105">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroProminent;
