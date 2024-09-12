import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaChevronDown, FaSearch, FaTags, FaCalendarAlt, FaUser, FaEye, FaShare, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
  import Beta from '../assets/images/cool_design.png'
  import MazsAI12 from '../assets/images/MazsAI_v1.2.0.png'
  import MazsAI11 from '../assets/images/MazsAI_v1.1.0.png'
const blogPosts = [
  {
    image:MazsAI12,
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
    image: MazsAI11, 
    title: "Mazs AI: A Technical Deep Dive", 
    excerpt: "Comprehensive analysis of a neural network-powered chatbot, exploring architecture, training, limitations, and future enhancements in conversational AI", 
    author: "Alston Chang", 
    date: "August 12, 2024",
    link: "/news13",
    category: "AI",
    views: 30,
    readTime: "1 min "
  },
  { 
    image: Beta, 
    title: "GMTStudio Beta", 
    excerpt: "Beta version of website from GMTStudio", 
    author: "Alston Chang", 
    date: "July 27, 2024",
    link: "/news11",
    category: "Development Log",
    views: 10,
    readTime: "1 min "
  },

];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [sortBy, setSortBy] = useState('date');
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % filteredPosts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [filteredPosts.length]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length);
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
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
            {filteredPosts.map((post, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-xl flex flex-col h-full"
                variants={itemVariants}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white text-sm font-semibold bg-blue-500 px-2 py-1 rounded-full">{post.category}</span>
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

          {/* Mobile Slider */}
          <div className="md:hidden relative">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex transition-transform ease-in-out duration-300"
                initial={false}
                animate={{ x: `-${currentSlide * 100}%` }}
              >
                {filteredPosts.map((post, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative flex w-full flex-col rounded-xl bg-gray-400 bg-clip-border text-gray-900 shadow-lg dark:bg-gray-900 dark:text-white">
                      <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-lg font-bold">{post.category}</span>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-gray-400 text-sm flex items-center">
                            <FaCalendarAlt className="mr-2" /> {post.date}
                          </p>
                          <p className="text-gray-400 text-sm flex items-center">
                            <FaEye className="mr-2" /> {post.views} views
                          </p>
                        </div>
                        <h5 className="mb-2 text-2xl font-semibold leading-snug tracking-normal text-white">
                          {post.title}
                        </h5>
                        <p className="mb-4 text-gray-200 dark:text-gray-200">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-400 text-sm flex items-center">
                            <FaUser className="mr-2" /> {post.author}
                          </p>
                          <p className="text-gray-400 text-sm">{post.readTime}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <Link 
                            to={post.link}
                            className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-orange-500 py-3 px-6 text-center text-base font-bold uppercase text-white transition-all hover:shadow-lg focus:shadow-none hover:from-orange-500 hover:to-red-500"
                          >
                            Read More
                          </Link>
                          <button className="text-gray-400 hover:text-white transition-colors duration-200">
                            <FaShare />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
              <FaChevronRight />
            </button>
          </div>
        </AnimatePresence>
        
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