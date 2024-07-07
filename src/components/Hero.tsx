import React, { useEffect, useState, useRef } from 'react';

const Hero: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleLearnMoreClick = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        id="hero"
        className={`pt-20 h-screen flex place-items-center justify-center text-center relative ${isDarkMode ? 'dark-mode-wallpaper' : 'light-mode-wallpaper'}`}
        aria-label="Hero section with background video"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          src="path-to-your-video.mp4"
          autoPlay
          loop
          muted
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-8 animate-fadeIn">
            Welcome to <span className="text-white">GMTStudio</span>
          </h1>
          <h2 className="text-3xl mb-6 text-indigo-300 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            Beyond Code, Beyond Limits.
          </h2>
          <p className="text-2xl text-gray-300 mb-6 animate-fadeIn" style={{ animationDelay: '1s' }}>
            Enhanced tools and applications to make your life easier.
          </p>
          <button onClick={handleLearnMoreClick} className="inline-block px-10 py-4 font-semibold rounded-lg shadow-md bg-indigo-500 text-white transform transition-transform duration-500 hover:scale-105 hover:bg-indigo-600 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
            Learn More
          </button>
        </div>
      </section>
      <div ref={projectsRef} id="projects">
        {/* Projects content here */}
      </div>
    </>
  );
};

export default Hero;
