import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight, FaRocket, FaShieldAlt, FaBitcoin } from 'react-icons/fa';

const ResearchCard = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className: string }>;
}) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex p-6 items-center space-x-4">
      <Icon className="text-4xl text-blue-500 dark:text-blue-400" />
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
      </div>
      <FaChevronRight className="ml-auto text-gray-400 dark:text-gray-500" />
    </div>
  </motion.div>
);

const Research = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="hero-section flex flex-col items-center justify-center text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NO much Resarch 
          </h1>
          <p className="text-2xl mb-10 max-w-2xl">
            I don't know what to write here.
          </p>
          <div className="flex space-x-4">
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ResearchCard
            title="AI and Machine Learning"
            description="Developing cutting-edge algorithms that drive innovation and solve complex problems."
            Icon={FaRocket}
          />
          <ResearchCard
            title="Cybersecurity"
            description="Creating robust systems to protect against evolving threats and ensure digital safety."
            Icon={FaShieldAlt}
          />
          <ResearchCard
            title="Blockchain Technology"
            description="Exploring decentralized applications to revolutionize industries and drive efficiency."
            Icon={FaBitcoin}
          />
        </div>
      </div>
    </div>
  );
};

export default Research;
