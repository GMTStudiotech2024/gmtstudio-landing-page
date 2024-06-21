import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const ResearchArea = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="w-full p-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <FaChevronDown
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const Research = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="hero-section flex flex-col items-center justify-center text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Our Research
          </h1>
          <p className="mb-8 text-xl max-w-2xl">
            At our company, we are dedicated to advancing technology through cutting-edge research and innovative solutions.
          </p>
          <div className="flex space-x-4 mb-8">
            <motion.button
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>

        <div className="space-y-6">
          <ResearchArea
            title="AI and Machine Learning"
            description="We are at the forefront of AI and machine learning, developing algorithms that learn and adapt to solve complex problems and drive innovation across industries."
          />
          <ResearchArea
            title="Cybersecurity"
            description="Our cybersecurity research focuses on creating robust and adaptive systems that protect against evolving threats, ensuring the safety and privacy of digital assets and information."
          />
          <ResearchArea
            title="Blockchain Technology"
            description="We are exploring blockchain technology to develop decentralized applications that revolutionize various industries, from finance to supply chain management and beyond."
          />
        </div>
      </div>
    </div>
  );
};

export default Research;