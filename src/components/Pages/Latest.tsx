import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
  FaThLarge,
  FaList,
  FaRegComments,
} from 'react-icons/fa';
import blogImage1 from '../assets/images/MazsAiPic.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/Story.jpg';
import Theta from '../assets/images/feature.png';
import ThetaDev from '../assets/images/large-image.png';
import WebDev from '../assets/images/1.png';
import Beta from '../assets/images/cool_design.png';
import AI from '../assets/images/AI.png';
import GMTStudio from '../assets/images/GMTStudio_a.png';
import MazsAI12 from '../assets/images/MazsAI_v1.2.0.png';
import MazsAI11 from '../assets/images/MazsAI_v1.1.0.png';
import MazsAI13 from '../assets/images/Mazs13.png'
interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  link: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    image:GMTStudio,
    title: 'website migration',
    excerpt:"We move our website to new domain",
    author: "Alston Chang",
    date:"September 30, 2024",
    link:"/news19",
    category:"Development log"
  },
  {
    image: MazsAI13,
    title: "Mazs AI v1.3.5 Anatra update",
    excerpt: "Mazs AI v1.3.5 Anatra is now updated, adding new features and updating the UI.",
    author: "Alston Chang",
    date: "September 12, 2024",
    link: "/news18",
    category: "AI",
  },
  {
    image: MazsAI12,
    title: "Mazs AI v1.2.0 Anatra update",
    excerpt: "Mazs AI v1.2.0 Anatra is now updated, adding new features and updating the UI.",
    author: "Alston Chang",
    date: "September 12, 2024",
    link: "/news17",
    category: "AI",
  },
  {
    image: MazsAI11,
    title: "Mazs AI v1.1.0 Anatra update",
    excerpt: "Mazs AI v1.1.0 Anatra is now updated. We've moved the AI to the official website and added some new UI elements.",
    author: "Alston Chang",
    date: "September 01, 2024",
    link: "/news16",
    category: "AI",
  },
  {
    image: AI,
    title: "Mazs AI v1.0 Anatra update",
    excerpt: "Mazs AI v1.0 Anatra is a new AI website generator that is powered by the latest technology and it is the first of its kind.",
    author: "Alston Chang",
    date: "August 19, 2024",
    link: "/news15",
    category: "AI",
  },
  {
    image: GMTStudio,
    title: "Bring Mazs AI into our official website",
    excerpt: "We are excited to announce the integration of Mazs AI into our official website. you can not only now use our AI to search for anything in this website, but also ask any questions.",
    author: "Alston Chang",
    date: "August 15, 2024",
    link: "/news14",
    category: "Development Log",
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
  const [postsPerPage,] = useState(6);
  const [isGridView, setIsGridView] = useState(true);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    []
  );

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter((post) => selectedCategory === 'All' || post.category === selectedCategory)
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [selectedCategory, searchTerm]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Handle keyboard navigation for pagination
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
        paginate(currentPage + 1);
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentPage > 1) {
        paginate(currentPage - 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [currentPage, filteredPosts]);

  return (
    <section
      id="blog"
      className="pt-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black min-h-screen"
      aria-labelledby="latest-news-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.h1
            id="latest-news-heading"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Latest{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              News
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-describedby="latest-news-description"
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Stay updated with the latest developments and insights from GMTStudio
          </motion.p>
        </div>

        {/* Category and Search Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          {/* Categories */}
          <div
            className="flex flex-wrap justify-center mb-4 sm:mb-0"
            role="group"
            aria-label="Blog Categories"
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter by ${category}`}
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

          {/* Search and View Toggle */}
          <div className="flex items-center">
            {/* Search Input */}
            <div className="relative mr-4">
              <label htmlFor="search-posts" className="sr-only">
                Search posts
              </label>
              <input
                id="search-posts"
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                aria-label="Search posts"
              />
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>

            {/* View Toggle Button */}
            <button
              onClick={() => setIsGridView(!isGridView)}
              aria-label={`Switch to ${isGridView ? 'list' : 'grid'} view`}
              className="p-2 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {isGridView ? (
                <FaList className="text-gray-600 dark:text-gray-300" aria-hidden="true" />
              ) : (
                <FaThLarge className="text-gray-600 dark:text-gray-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Blog Posts */}
        <AnimatePresence>
          <motion.div
            layout
            className={
              isGridView
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'
                : 'space-y-8'
            }
          >
            {currentPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex ${
                  isGridView ? 'flex-col' : 'flex-row'
                } rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105`}
                role="article"
                aria-labelledby={`post-title-${index}`}
              >
                {/* Post Image */}
                <div
                  className={`relative ${
                    isGridView ? 'h-64' : 'w-1/3 h-full'
                  } overflow-hidden rounded-3xl ${
                    isGridView
                      ? 'rounded-b-none'
                      : 'rounded-l-3xl rounded-r-none'
                  }`}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-125"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-75 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">{post.category}</span>
                  </div>
                </div>

                {/* Post Content */}
                <div className={`${isGridView ? 'p-6' : 'p-6 w-2/3'}`}>
                  {/* Post Meta */}
                  <div className="flex items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt className="mr-2" aria-hidden="true" />
                    <span>{post.date}</span>
                    <FaUser className="ml-4 mr-2" aria-hidden="true" />
                    <span>{post.author}</span>
                  </div>

                  {/* Post Title */}
                  <h5
                    id={`post-title-${index}`}
                    className="mb-3 text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {post.title}
                  </h5>

                  {/* Post Excerpt */}
                  <p className="mb-4 text-gray-700 dark:text-gray-300">{post.excerpt}</p>

                  {/* Post Actions */}
                  <div className="flex justify-between items-center">
                    <a
                      href={post.link}
                      className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-2 px-4 text-center text-sm font-semibold uppercase text-white transition-all hover:shadow-xl focus:shadow-none hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      Read More
                    </a>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaTags className="mr-2" aria-hidden="true" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {filteredPosts.length > postsPerPage && (
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center">
            {/* Previous Page Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className="mb-4 sm:mb-0 px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>

            {/* Page Indicators */}
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Page {currentPage} of {Math.ceil(filteredPosts.length / postsPerPage)}
              </span>
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastPost >= filteredPosts.length}
              aria-label="Next Page"
              className="px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Feedback Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              // Open feedback modal (to be implemented)
            }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold transition-all hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <FaRegComments className="mr-2" aria-hidden="true" />
            Give Feedback
          </button>
        </div>
      </div>
    </section>
  );
};

export default Latest;