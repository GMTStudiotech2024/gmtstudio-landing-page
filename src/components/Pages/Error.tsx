import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft, FaInfoCircle, FaEnvelope, FaBriefcase, FaNewspaper } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IconContext } from "react-icons";

const Error: React.FC = () => {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLinks(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <IconContext.Provider value={{ size: "1.5em", className: "inline-block mr-2 align-text-bottom" }}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <motion.div 
          className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <FaExclamationTriangle className="text-8xl text-red-600 dark:text-red-400 mb-6 mx-auto animate-pulse" />
          </motion.div>
          <motion.h1 
            className="text-9xl font-bold text-red-700 dark:text-red-400 mb-8"
            variants={itemVariants}
          >
            404
          </motion.h1>
          <motion.p 
            className="text-3xl text-gray-700 dark:text-gray-300 mb-8 font-semibold"
            variants={itemVariants}
          >
            Oops! Page Not Found
          </motion.p>
          <motion.p 
            className="text-lg text-gray-500 dark:text-gray-400 mb-8"
            variants={itemVariants}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={itemVariants}
          >
            <motion.button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Go Home
            </motion.button>
            <motion.button 
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft /> Go Back
            </motion.button>
          </motion.div>
          <AnimatePresence>
            {showLinks && (
              <motion.div 
                className="mt-8 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl font-semibold mb-4">Here are some helpful links:</p>
                <ul className="mt-4 space-y-3">
                  <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="/about" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center">
                      <FaInfoCircle /> About Us
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center">
                      <FaEnvelope /> Contact Us
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="/services" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center">
                      <FaBriefcase /> Our Services
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center">
                      <FaNewspaper /> Blog
                    </a>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </IconContext.Provider>
  );
};

export default Error;
