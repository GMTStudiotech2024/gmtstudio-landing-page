import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaRobot, FaSearch,  FaThLarge, FaList, FaExclamationCircle, FaGlobe, FaCompass,  FaClock, FaFlask, FaLock , FaCode} from 'react-icons/fa';
import AnimatedItem from '../AnimatedItem';
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
    link: "/mazsai",
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
  {
    name: "AI Website Generator",
    description: "An AI website generator that allows you to create a website with AI.",
    image: projectImage1,
    icon: FaCode,
    category: "AI",
    link: "/website-builder",
    status: "live",
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
    <section id="products" className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold text-gray-900 dark:text-white mb-12 text-center"
        >
          Our Products
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
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
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
            className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
          >
            {filteredProducts.map((product, index) => (
              <AnimatedItem key={index} className="h-full">
                <motion.div 
                  className={`relative flex ${isGridView ? 'flex-col' : 'flex-row'} rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out`}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredProduct(index)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  <div className={`relative ${isGridView ? 'h-48' : 'w-1/3 h-full'} overflow-hidden rounded-t-2xl ${isGridView ? '' : 'rounded-l-2xl rounded-r-none'}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm">
                      {getStatusIcon(product.status)}
                    </div>
                  </div>
                  <div className={`${isGridView ? 'p-4' : 'p-4 w-2/3'}`}>
                    <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center">
                      <product.icon className="mr-2 text-xl text-blue-500" />
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <a 
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full bg-blue-500 py-2 px-4 text-center text-sm font-medium text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Learn More
                      </a>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {getStatusText(product.status)}
                      </div>
                    </div>
                  </div>
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
