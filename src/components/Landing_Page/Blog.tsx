import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  FaChevronDown, FaSearch, FaTags, FaCalendarAlt, FaUser, 
  FaEye, FaRegHeart 
} from 'react-icons/fa';
import MazsAI12 from '../assets/images/MazsAI_v1.2.0.png';
import GMTStudio from '../assets/images/GMTStudio_p.png'
import MazsAI13 from '../assets/images/Mazs13.png';
const blogPosts = [
  {
    image:GMTStudio,
    title: 'website migration',
    excerpt:"We move our website to new domain",
    author: "Alston Chang",
    date:"September 30, 2024",
    link:"/news19",
    category:"Development log",
    views:100,
    readTime:"1 min"
  },
  {
    image:MazsAI13,
    title:"Mazs AI v1.2.0 Anatra update",
    excerpt:"Mazs AI v1.2.0 Anatra is now update, adding new features and update UI for it.",
    author:"Alston Chang",
    date:"September 12, 2024",
    link:"/news17",
    category:"Development Log",
    views:100,
    readTime:"1 min"
  },
  {
    image:MazsAI12,
    title:"Mazs AI v1.2.0 Anatra update",
    excerpt:"Mazs AI v1.2.0 Anatra is now update, adding new features and update UI for it.",
    author:"Alston Chang",
    date:"September 12, 2024",
    link:"/news18",
    category:"Development Log",
    views:100,
    readTime:"1 min"
  },

];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [sortBy, setSortBy] = useState('date');
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const [showMore, setShowMore] = useState(6); // Number of posts to show initially

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  useEffect(() => {
    let filtered = blogPosts.filter(post => 
      (selectedCategory === 'All' || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'views') {
        return b.views - a.views;
      }
      return 0;
    });

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm, sortBy]);

  // Implement lazy loading of images
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imgPromises = filteredPosts.map(post => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = post.image;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imgPromises).then(() => {
      setImagesLoaded(true);
    });
  }, [filteredPosts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const loadMore = () => {
    setShowMore(prev => prev + 6);
  };

  return (
    <section id="blog" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          Latest News
        </motion.h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-wrap justify-center mb-4 md:mb-0">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`m-1 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Filter by ${category}`}
              >
                <FaTags className="inline-block mr-2" />
                {category}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                aria-label="Search posts"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              aria-label="Sort posts"
            >
              <option value="date">Sort by Date</option>
              <option value="views">Sort by Views</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.slice(0, showMore).map((post, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex flex-col h-full"
                variants={itemVariants}
                tabIndex={0}
                aria-label={`Read more about ${post.title}`}
              >
                <div className="relative h-48 overflow-hidden">
                  {imagesLoaded ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <span className="text-white text-sm font-semibold bg-blue-500 px-2 py-1 rounded-full">{post.category}</span>
                    <button className="text-white hover:text-red-500 transition-colors" aria-label="Like post">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400 mt-auto">
                    <span className="flex items-center">
                      <FaUser className="mr-2" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {post.date}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-700 flex justify-between items-center mt-auto">
                  <Link 
                    to={post.link}
                    className="text-blue-400 font-medium hover:underline"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More
                  </Link>
                  <div className="flex items-center text-sm text-gray-400">
                    <FaEye className="mr-1" />
                    {post.views} views
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {showMore < filteredPosts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Load More
            </button>
          </div>
        )}

        <motion.div 
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/Latest"
            className="mt-4 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group text-lg font-medium"
          >
            More News 
            <FaChevronDown className="ml-2 group-hover:translate-y-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Blog;