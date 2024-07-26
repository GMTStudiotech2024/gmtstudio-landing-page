import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, Zap, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLearnMoreClick = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { icon: <Star className="w-6 h-6 text-yellow-400" />, text: "Premium Quality" },
    { icon: <Zap className="w-6 h-6 text-blue-400" />, text: "Lightning Fast" },
    { icon: <Shield className="w-6 h-6 text-green-400" />, text: "Secure & Reliable" },
  ];

  return (
    <>
      <motion.section
        id="hero"
        className={`min-h-screen flex items-center justify-center sm:justify-end pt-10 px-4 sm:pr-10 text-center sm:text-right relative bg-cover bg-center transition-background ${isDarkMode ? 'dark-mode-wallpaper' : 'light-mode-wallpaper'}`}
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-emerald-400">GMTStudio</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 sm:mb-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Enhanced tools and applications to make your life easier.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center sm:justify-end gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center bg-gray-800 bg-opacity-70 rounded-full px-4 py-2">
                {feature.icon}
                <span className="ml-2 text-white">{feature.text}</span>
              </div>
            ))}
          </motion.div>
         
        </div>
      </motion.section>
      <motion.div
        className={`fixed bottom-8 right-8 bg-indigo-600 p-3 rounded-full cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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