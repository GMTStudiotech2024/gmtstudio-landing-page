import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, SparklesIcon, BeakerIcon, LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import bck from '../assets/images/AI.png';

const LaunchGMTStudio: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    { icon: BeakerIcon, text: "Advanced AI Algorithms" },
    { icon: LightBulbIcon, text: "Innovative Problem Solving" },
    { icon: RocketLaunchIcon, text: "Rapid Prototyping" },
  ];

  return (
    <section className="py-20 md:py-32 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 overflow-hidden relative">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            className="flex-1 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Unleash the Power of GMTStudio AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Dive into a world of limitless possibilities with our state-of-the-art AI platform. Transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/mazsai"
                className="px-8 py-4 bg-blue-500 dark:bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-center group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>Launch Mazs AI</span>
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.button
                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-center group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
                <SparklesIcon className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
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
              className="w-full h-auto rounded-3xl shadow-2xl dark:shadow-gray-700"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <feature.icon className="w-10 h-10 text-blue-500 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.text}</h3>
              <p className="text-gray-600 dark:text-gray-300">Experience the cutting-edge technology that powers our AI solutions.</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchGMTStudio;