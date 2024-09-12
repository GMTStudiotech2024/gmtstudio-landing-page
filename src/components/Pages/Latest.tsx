import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUser, FaTags, FaChevronLeft, FaChevronRight, FaThLarge, FaList } from 'react-icons/fa';
import blogImage1 from '../assets/images/MazsAiPic.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/Story.jpg';
import Theta from '../assets/images/feature.png';
import ThetaDev from '../assets/images/large-image.png';
import WebDev from '../assets/images/1.png'
import Beta from '../assets/images/cool_design.png'
import AI from '../assets/images/AI.png'
import GMTStudio from '../assets/images/GMTStudio_a.png'
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
    category:"AI",
  },
  {
    image:MazsAI11,
    title:"Mazs AI v1.1.0 Anatra update",
    excerpt:"Mazs AI v1.1.0 Anatra is now update, we move the AI to official website, and add some new UI for it.",
    author:"Alston Chang",
    date:"September 01, 2024",
    link:"/news16",
    category:"AI",
  },

  {
    image:AI,
    title:"Mazs AI v1.0 Anatra update",
    excerpt:"Mazs AI v1.0 Anatra is a new AI website generator that is powered by the latest technology and it is the first of its kind.",
    author:"Alston Chang",
    date:"August 19, 2024",
    link:"/news15",
    category:"AI",
  },
  {
    image:GMTStudio,
    title:"Bring Mazs AI into our official website",
    excerpt:"We are excited to announce the integration of Mazs AI into our official website. you can not only now use our AI to search for anything in this website, but also ask any questions.",
    author:"Alston Chang",
    date:"August 15, 2024",
    link:"/news14",
    category:"Development Log",
  },
  {
    image: AI,
    title: "Mazs AI v1.0 update: A Technical Deep Dive",
    excerpt: "Comprehensive analysis of a neural network-powered chatbot, exploring architecture, training, limitations, and future enhancements in conversational AI.",
    author: "Alston Chang",
    date: "August 5, 2024",
    link: "/NEWS13",
    category: "AI Development"
  },
  {
    image: blogImage1,
    title: "Mazs AI: A Technical Deep Dive",
    excerpt: "Comprehensive analysis of a neural network-powered chatbot, exploring architecture, training, limitations, and future enhancements in conversational AI.",
    author: "Alston Chang",
    date: "August 5, 2024",
    link: "/NEWS12",
    category: "AI Development"
  },
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
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [isGridView, setIsGridView] = useState(true);

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

  const handlePostsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <section id="blog" className="pt-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">News</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Stay updated with the latest developments and insights from GMTStudio
          </motion.p>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
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
                placeholder="Search posts..."
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
            {currentPosts.map((post, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex ${isGridView ? 'flex-col' : 'flex-row'} rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}
              >
                <div className={`relative ${isGridView ? 'h-56' : 'w-1/3 h-full'} overflow-hidden rounded-t-xl ${isGridView ? '' : 'rounded-l-xl rounded-r-none'}`}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-bold">{post.category}</span>
                  </div>
                </div>
                <div className={`${isGridView ? 'p-6' : 'p-6 w-2/3'}`}>
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
                      className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-2 px-4 text-center text-sm font-bold uppercase text-white transition-all hover:shadow-lg focus:shadow-none hover:from-pink-600 hover:to-purple-600"
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
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors shadow-md"
            >
              <FaChevronLeft />
            </button>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700 dark:text-gray-300">Posts per page:</span>
              <select
                value={postsPerPage}
                onChange={handlePostsPerPageChange}
                className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastPost >= filteredPosts.length}
              className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors shadow-md"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Latest;
