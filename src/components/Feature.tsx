import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import featureImage from '../assets/images/feature.png';

type FeatureType = {
  title: string;
  description: string;
  amount?: string;
  status?: string;
  currency?: string;
  balance?: string;
};

const features: FeatureType[] = [
  {
    title: 'MAZS AI',
    description: 'The MAZS AI is a Chat bot that uses NLP (Natural Language Processing) and responds improperly to annoy users.',
    amount: 'Unlimited',
    status: 'Successfully Launched',
  },
  {
    title: 'Enhanced Database',
    description: 'Using a new type of database storage, the MAZS AI and other applications can provide a better user experience.',
    status: 'For all users',
  },
  {
    title: 'Analytics',
    description: 'There are no analytics but just a few brain cells left over here.',
    currency: '99+',
    balance: 'Ya, nothing but brain cells',
  },
];

type FeatureCardProps = {
  feature: FeatureType;
  index: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="feature-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800 dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h4 className="text-2xl font-semibold mb-4 text-white dark:text-white flex items-center">
        <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          {feature.title}
        </span>
      </h4>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : '100px' }}
        className="overflow-hidden"
      >
        <p className="text-lg text-gray-300 dark:text-gray-300 mb-4">
          {feature.description}
        </p>
        {feature.amount && (
          <p className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-300">
            {feature.amount}
          </p>
        )}
        {feature.status && (
          <p className="text-green-500 mb-4">
            {feature.status}
          </p>
        )}
        {feature.currency && (
          <div className="text-lg text-yellow-500">
            Braincell count: {feature.currency}
          </div>
        )}
        {feature.balance && (
          <div className="text-4xl font-bold text-gray-800 dark:text-gray-300">
            {feature.balance}
          </div>
        )}
      </motion.div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
        {isExpanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
      </button>
    </motion.div>
  );
};

const Feature: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-gradient-to-b from-gray-800 to-gray-800 dark:from-gray-900 dark:to-black text-white dark:text-white  bck-cus">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:space-x-12 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text">
              Our Features
            </h2>
            <p className="text-lg mb-6">
              We offer an enhanced user interface and experience with the following features:
            </p>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li>Highly customizable components to suit your needs.</li>
              <li>Responsive design that looks great on any device.</li>
              <li>Optimized performance for a smooth user experience.</li>
              <li>Integrated with the latest technologies for best practices.</li>
            </ul>
            <motion.a
              href="#more-features"
              className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
          <motion.div
            className="lg:w-1/2 w-full flex justify-center relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-500 opacity-50 rounded-lg shadow-lg"></div>
            <img
              src={featureImage}
              alt="Feature"
              className="relative z-10 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            />
          </motion.div>
        </motion.div>
        <div id="more-features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
