import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Globe2, Play, Pause } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFloating, setIsFloating] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center text-center relative bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/path/to/your/infinity-background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          animate={isFloating ? {
            y: [0, -20, 0],
            x: [0, 20, 0],
          } : {}}
          transition={isFloating ? {
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          } : {}}
        />
        <div className="relative z-10 p-6 sm:p-8 max-w-4xl w-full">
          <motion.div
            className="flex flex-col items-center mb-6 sm:mb-10"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Globe2 className="text-white w-14 h-14 mb-4" />
            <h1 className="text-9xl sm:text-9xl md:text-6xl lg:text-7xl font-extrabold text-white">
              GMTStudio
            </h1>
          </motion.div>
          <motion.p
            className="text-2xl sm:text-2xl md:text-2xl text-white mb-6 sm:mb-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Enhanced tools and applications to make your life easier.
          </motion.p>
          <motion.div
            className="flex flex-col items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ChevronDown className="text-white animate-bounce" size={32} />
          </motion.div>
        </div>
        <motion.button
          className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full cursor-pointer"
          onClick={() => setIsFloating(!isFloating)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFloating ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
        </motion.button>
      </motion.section>
      <motion.div
        className={`fixed bottom-8 right-8 bg-indigo-600 p-3 rounded-full cursor-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
