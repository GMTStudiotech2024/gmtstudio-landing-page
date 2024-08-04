import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import bck from '../assets/images/launch_bck.jpg';

const LaunchGMTStudio: React.FC = () => {
  return (
    <section className="py-12 md:py-16 flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full gap-6 md:gap-8 items-center">
        <motion.div
          className="flex-1 md:self-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center md:text-left">
            Experience the Future with GMTStudio Beta
          </h1>
        </motion.div>

        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
            <img
              src={bck}
              alt="Space background"
              className="w-full h-full object-cover filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#4ade80] text-white text-lg sm:text-xl font-bold rounded-lg shadow-xl hover:bg-[#22c55e] transition duration-300 ease-in-out flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.a href="/dashboard">Launch GMTStudio Beta</motion.a>
                <ChevronRightIcon className="w-6 h-6 sm:w-7 sm:h-7 ml-2 sm:ml-3" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchGMTStudio;