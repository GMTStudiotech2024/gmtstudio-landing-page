import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';
import blogImage1 from '../assets/images/MazsAiPic.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/Story.jpg';
import Theta from '../assets/images/feature.png';
import ThetaDev from '../assets/images/large-image.png';
import WebDev from '../assets/images/1.png'
import Beta from '../assets/images/cool_design.png'

const blogPosts = [
  {
    image: Beta,
    title: "GMTStudio Beta",
    excerpt: "Beta version of website from GMTStudio",
    author: "Alston Chang",
    date: "July 27, 2024",
    link: "/NEWS11",
    category: "Development log"
  },
  {
    image: WebDev,
    title: "Official Website Update",
    excerpt:"New update and GMTStudio Official Website",
    author: "Alston Chang",
    date: "July 24, 2024",
    link: "/NEWS10",
    category: "Development log"
  },
  { 
    image: blogImage1, 
    title: "UI of GMTStudio AI Workspace", 
    excerpt: "New UI design for GMTStudio AI Workspace", 
    author: "Alston Chang", 
    date: "July 21, 2024",
    link: "/NEWS9",
    category: "AI Development"
  },
  { 
    image: blogImage3, 
    title: "Front-end develop", 
    excerpt: "new update of current develop", 
    author: "Alston Chang", 
    date: "July 21, 2024",
    link: "/NEWS8",
    category: "Development log"
  },
  { 
    image: blogImage2, 
    title: "Error of Database", 
    excerpt: "The error of database is fixed", 
    author: "Lucus Yeh", 
    date: "July 20, 2024",
    link: "/NEWS7",
    category: "Social Media"
  },
  { 
    image: ThetaDev, 
    title: "Bug fixed", 
    excerpt: "Trying to fix the bug inside code", 
    author: "Lucus Yeh", 
    date: "July 20, 2024",
    link: "/NEWS6",
    category: "Social Media"
  },
  { 
    image: blogImage3, 
    title: "New Project in queue", 
    excerpt: "New project idea from GMTStudio", 
    author: "Alston Chang", 
    date: "July 01, 2024",
    link: "/NEWS5",
    category: "New Project"
  },
  { 
    image: blogImage1, 
    title: "Enhance database for AI", 
    excerpt: "Update Mazs AI to v0.61.2", 
    author: "Alston Chang", 
    date: "June 20, 2024",
    link: "/NEWS4",
    category: "AI Development"
  },
  { 
    image: blogImage1, 
    title: "Launch GMTStudio AI workspace", 
    excerpt: "Provide Mazs AI for free to use", 
    author: "Alston Chang", 
    date: "May 26, 2024",
    link: "/NEWS3",
    category: "AI Development"
  },
  { 
    image: Theta, 
    title: "Launch Social Media application", 
    excerpt: "Theta Social Media is now launch in Beta version", 
    author: "Lucus Yeh", 
    date: "May 25, 2024",
    link: "/NEWS2",
    category: "Social Media"
  },
  { 
    image: ThetaDev, 
    title: "New project in queue", 
    excerpt: "Currently developing new project, about Social media platform", 
    author: "Lucus Yeh", 
    date: "April 01, 2024",
    link: "/NEWS1",
    category: "Social Media"
  },
];

const Latest: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  return (
    <section id="blog" className="py-16 bg-gradient-to-b from-gray-200 to-gray-200 dark:from-gray-900 dark:to-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-black dark:text-white mb-12 text-center"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Latest News</span>
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
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {currentPosts.map((post, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex w-full flex-col rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-bold">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt className="mr-2" />
                    <span>{post.date}</span>
                    <FaUser className="ml-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <h5 className="mb-2 text-2xl font-semibold leading-snug tracking-normal text-gray-900 dark:text-white">
                    {post.title}
                  </h5>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <a 
                      href={post.link}
                      className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-orange-500 py-2 px-4 text-center text-sm font-bold uppercase text-white transition-all hover:shadow-lg focus:shadow-none hover:from-orange-500 hover:to-red-500"
                    >
                      Read More
                    </a>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaTags className="mr-2" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length > postsPerPage && (
          <div className="mt-8 flex justify-center">
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Latest;
