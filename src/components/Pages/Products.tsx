import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket,
  FaSearch,
  FaThLarge,
  FaList,
  FaExclamationCircle,
  FaGlobe,
  FaCompass,
  FaCode,
  FaTimes,
} from 'react-icons/fa';
import AnimatedItem from '../AnimatedItem';
import projectImage1 from '../assets/images/MazsAI_v1.2.0.png';
import projectImage2 from '../assets/images/blog5.png';
import projectImage3 from '../assets/images/Story.jpg';
import game_ohmypc from '../assets/images/Game_ohmypc.jpg';
import game_dungeon from '../assets/images/Game_dungeon.jpg';
import AI from '../assets/images/AIwebgen.png';

const products = [
  {
    name: 'GMTStudio AI WorkSpace',
    description:
      'GMTStudio designed their own AI, MAZS AI. Although it is still in development, you can use it!',
    image: projectImage1,
    icon: FaRocket,
    category: 'AI',
    link: 'https://mazs-ai-lab.vercel.app/',
    status: 'beta',
    details:
      'Detailed information about GMTStudio AI WorkSpace. Features, usage instructions, and more.',
  },
  {
    name: 'GMTStudio Story Vending Machine',
    description:
      'New Ideas in GMTStudio, We are currently developing the front end!',
    image: projectImage3,
    icon: FaExclamationCircle,
    category: 'Innovation',
    link: '/',
    status: 'coming_soon',
    details:
      'Detailed information about GMTStudio Story Vending Machine. Features, expected release dates, and more.',
  },
  {
    name: 'Theta Social Media Platform',
    description:
      'Using Appwrite and Vite, we designed one of the greatest social media platforms of all time.',
    image: projectImage2,
    icon: FaGlobe,
    category: 'Web',
    link: 'https://theta-plum.vercel.app/',
    status: 'live',
    details:
      'Detailed information about Theta Social Media Platform. Features, user guides, and more.',
  },
  {
    name: 'Game - Oh My PC',
    description:
      'A game that simulates a person who has a bad PC but wants to be a YouTuber or developer, who has to make viral content to earn money.',
    image: game_ohmypc,
    icon: FaCompass,
    category: 'Game',
    link: '/',
    status: 'in_development',
    details:
      'Detailed information about Game - Oh My PC. Gameplay mechanics, development progress, and more.',
  },
  {
    name: 'Game - (Not Decided Yet)',
    description:
      'An exciting new game concept currently in the early stages of development.',
    image: game_dungeon,
    icon: FaCompass,
    category: 'Game',
    link: '/',
    status: 'concept',
    details:
      'Detailed information about the upcoming game. Concept art, features, and development timeline.',
  },
  {
    name: 'AI Website Generator',
    description:
      'An AI website generator that allows you to create a website with AI.',
    image: AI,
    icon: FaCode,
    category: 'AI',
    link: '/website-builder',
    status: 'live',
    details:
      'Detailed information about AI Website Generator. How to use it, features, and pricing.',
  },
];

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];

  const filteredProducts = products
    .filter((product) => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { text: string; color: string } } = {
      beta: { text: 'Beta', color: 'bg-yellow-500' },
      coming_soon: { text: 'Coming Soon', color: 'bg-blue-500' },
      live: { text: 'Live', color: 'bg-green-500' },
      in_development: { text: 'In Development', color: 'bg-purple-500' },
      concept: { text: 'Concept', color: 'bg-gray-500' },
    };

    const statusInfo = statusMap[status] || { text: 'Unknown', color: 'bg-gray-500' };

    return (
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${statusInfo.color}`}
      >
        {statusInfo.text}
      </span>
    );
  };

  return (
    <section id="products" className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
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
                className={`mx-2 my-1 px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
                aria-pressed={selectedCategory === category}
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
                aria-label="Search products"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isGridView ? 'Switch to List View' : 'Switch to Grid View'}
            >
              {isGridView ? (
                <FaList className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FaThLarge className="text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={isGridView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}
          >
            {filteredProducts.map((product, index) => (
              <AnimatedItem key={index} className="h-full">
                <motion.div
                  className={`relative flex ${
                    isGridView ? 'flex-col' : 'flex-row'
                  } rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProduct(product)}
                  onHoverStart={() => setHoveredProduct(index)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  tabIndex={0}
                  role="button"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setSelectedProduct(product);
                    }
                  }}
                >
                  <div
                    className={`relative ${
                      isGridView ? 'h-60' : 'w-1/3 h-full'
                    } overflow-hidden rounded-t-3xl ${
                      isGridView ? 'rounded-b-none' : 'rounded-l-3xl rounded-r-none'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105 lazyload"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(product.status)}
                    </div>
                  </div>
                  <div className={`${isGridView ? 'p-6' : 'p-4 w-2/3'}`}>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center mb-2">
                      <product.icon className="mr-2 text-2xl text-blue-500" />
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full bg-blue-600 py-2 px-5 text-center text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Learn More
                      </a>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {getStatusBadge(product.status)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Modal for Product Details */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-xl w-full p-6 relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-500 focus:outline-none"
                  aria-label="Close Modal"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
                <h2 id="modal-title" className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  {selectedProduct.name}
                </h2>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedProduct.details}</p>
                <a
                  href={selectedProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-blue-600 py-2 px-5 text-center text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Products;
