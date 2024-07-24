import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import featureImage from '../assets/images/feature.png';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


type FeatureType = {
  title: string;
  description: string;
  amount?: string;
  status?: string;
  currency?: string;
  balance?: string;
  icon: React.ElementType;
};

const features: FeatureType[] = [
  {
    title: 'Push to deploy.',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    title: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    title: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
];

type FeatureCardProps = {
  feature: FeatureType;
  index: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <motion.div
      className="relative p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="absolute left-1 top-1 h-10 w-10">
        <feature.icon className="text-indigo-600" aria-hidden="true" />
      </div>
      <h4 className="text-2xl font-semibold text-gray-900 dark:text-white pl-12">{feature.title}</h4>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : '100px' }}
        className="overflow-hidden mt-4"
      >
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {feature.description}
        </p>
        {feature.amount && (
          <p className="text-4xl font-bold mb-4 text-blue-400 dark:text-blue-300">
            {feature.amount}
          </p>
        )}
        {feature.status && (
          <p className="text-green-500 mb-4 font-semibold">
            {feature.status}
          </p>
        )}
        {feature.currency && (
          <div className="text-lg text-yellow-500 font-semibold">
            Braincell count: {feature.currency}
          </div>
        )}
        {feature.balance && (
          <div className="text-4xl font-bold text-purple-400 dark:text-purple-300 mt-2">
            {feature.balance}
          </div>
        )}
      </motion.div>
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? 'Show Less' : 'Show More'}
        {isExpanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
      </motion.button>
    </motion.div>
  );
};

const Feature: React.FC = () => {
  const moreFeaturesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleLearnMoreClick = () => {
    if (moreFeaturesRef.current) {
      moreFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (moreFeaturesRef.current) {
      observer.observe(moreFeaturesRef.current);
    }

    return () => {
      if (moreFeaturesRef.current) {
        observer.unobserve(moreFeaturesRef.current);
      }
    };
  }, []);

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:space-x-12 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-600 via-purple-500 to-pink-500 bg-clip-text">
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
            <motion.button
              onClick={handleLearnMoreClick}
              className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
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
        <div id="more-features" ref={moreFeaturesRef}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
