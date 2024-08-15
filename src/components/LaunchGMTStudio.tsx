import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import bck from '../assets/images/AI.png';

const LaunchGMTStudio: React.FC = () => {
  return (
    <section className="py-20 md:py-32 flex items-center justify-center bg-gradient-radial from-indigo-900 via-purple-900 to-indigo-900 px-4 overflow-hidden relative">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-12 lg:gap-16 items-center">
        <motion.div
          className="flex-1 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight text-center lg:text-left">
            Unleash the Power of GMTStudio AI
          </h1>
          <p className="text-xl text-gray-300 mb-10 text-center lg:text-left max-w-2xl">
            Dive into a world of limitless possibilities with our state-of-the-art AI platform. Transform your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.a
              href="https://gmt-studio-ai-workspace.vercel.app/"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-center group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Launch Mazs AI</span>
              <ChevronRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-center group"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(167, 139, 250, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <SparklesIcon className="w-6 h-6 ml-2 group-hover:rotate-12 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img 
            src={bck} 
            alt="AI-powered workspace" 
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchGMTStudio;