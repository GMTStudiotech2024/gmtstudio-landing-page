import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaRobot, FaChartLine, FaShieldAlt, FaSearch, FaTags, FaThLarge, FaList, FaExclamationCircle, FaGlobe, FaCompass, FaInfoCircle, FaClock, FaFlask, FaLock } from 'react-icons/fa';
import AnimatedItem from './AnimatedItem';
import projectImage1 from '../assets/images/MazsAiPic.png';
import projectImage2 from '../assets/images/blog5.png';
import projectImage3 from '../assets/images/Story.jpg';
import game_ohmypc from '../assets/images/Game_ohmypc.jpg';
import game_dungeon from '../assets/images/Game_dungeon.jpg';

const products = [
  {
    name: "GMTStudio AI WorkSpace",
    description: "GMTStudio designed their own AI, MAZS AI. Although it is still in development, you can use it!",
    image: projectImage1,
    icon: FaRocket,
    category: "AI",
    link: "https://gmt-studio-ai-workspace.vercel.app/",
    status: "beta",
  },
  {
    name: "GMTStudio Story Vending Machine",
    description: "New Ideas in GMTStudio, We are currently developing the front end!",
    image: projectImage3,
    icon: FaExclamationCircle,
    category: "Innovation",
    link: "/",
    status: "coming_soon",
  },
  {
    name: "Theta Social Media Platform",
    description: "Using Appwrite and Vite, we designed one of the greatest social media platforms of all time.",
    image: projectImage2,
    icon: FaGlobe,
    category: "Web",
    link: "https://theta-plum.vercel.app/",
    status: "live",
  },
  {
    name: "Game - Oh My pc",
    description: "A game that simulates a person who has a bad pc but wants to be a YouTuber or developer, who has to make viral content to earn money.",
    image: game_ohmypc,
    icon: FaCompass,
    category: "Game",
    link: "/",
    status: "in_development",
  },
  {
    name: "Game - (not decided yet)",
    description: "An exciting new game concept currently in the early stages of development.",
    image: game_dungeon,
    icon: FaCompass,
    category: "Game",
    link: "/",
    status: "concept",
  },
];

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'beta':
        return <FaFlask className="text-yellow-500" />;
      case 'coming_soon':
        return <FaClock className="text-blue-500" />;
      case 'live':
        return <FaRocket className="text-green-500" />;
      case 'in_development':
        return <FaRobot className="text-purple-500" />;
      case 'concept':
        return <FaLock className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'beta':
        return 'Beta';
      case 'coming_soon':
        return 'Coming Soon';
      case 'live':
        return 'Live';
      case 'in_development':
        return 'In Development';
      case 'concept':
        return 'Concept';
      default:
        return '';
    }
  };

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Products</span>
        </motion.h2>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center mb-4 sm:mb-0">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mx-2 my-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md"
            >
              {isGridView ? <FaList className="text-gray-600 dark:text-gray-300" /> : <FaThLarge className="text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-8"}
          >
            {filteredProducts.map((product, index) => (
              <AnimatedItem key={index} className="h-full">
                <motion.div 
                  className={`relative flex ${isGridView ? 'flex-col' : 'flex-row'} rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredProduct(index)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  <div className={`relative ${isGridView ? 'h-56' : 'w-1/3 h-full'} overflow-hidden rounded-t-xl ${isGridView ? '' : 'rounded-l-xl rounded-r-none'}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-bold">{product.category}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2">
                      {getStatusIcon(product.status)}
                    </div>
                  </div>
                  <div className={`${isGridView ? 'p-6' : 'p-6 w-2/3'}`}>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center">
                      <product.icon className="mr-2 text-2xl text-blue-500 dark:text-yellow-400" />
                      {product.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <a 
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-2 px-4 text-center text-sm font-bold uppercase text-white transition-all hover:shadow-lg focus:shadow-none hover:from-pink-600 hover:to-purple-600"
                      >
                        Learn More
                      </a>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaTags className="mr-2" />
                        <span>{product.category}</span>
                      </div>
                    </div>
                    <div className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status: {getStatusText(product.status)}
                    </div>
                  </div>
                  {hoveredProduct === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
                    >
                      <p className="text-white text-sm">
                        <FaInfoCircle className="inline mr-2" />
                        Click to learn more about {product.name}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatedItem>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Products;
