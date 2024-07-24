import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link
import blogImage1 from '../assets/images/MazsAiPic.png';
import DEV from '../assets/images/1.png'
import blogImage3 from '../assets/images/Story.jpg';
import { FaChevronDown } from 'react-icons/fa';


const blogPosts = [
  { 
    image: DEV , 
    title: "GMTStudio's Official website Update", 
    excerpt: "We added some new feature to our official website, let's hop into the introduction of the new feature!", 
    author: "Alston Chang", 
    date: "July 24, 2024",
    link: "/NEWS10",
    category: "Development Log"
  },
  { 
    image: blogImage1, 
    title: "GMTStudio AI Workspace", 
    excerpt: "New UI design for GMTStudio AI Workspace", 
    author: "Alston Chang", 
    date: "July 21, 2024",
    link: "/BlogPage1",
    category: "AI"
  },
  { 
    image: blogImage3, 
    title: "Story Vending Machine", 
    excerpt: "New project idea from GMTStudio", 
    author: "Alston Chang", 
    date: "July 1, 2024",
    link: "/BlogPage3",
    category: "Innovation"
  },
];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section id="blog" className="py-16 bg-gradient-to-b from-gray-200 to-gray-200 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-black dark:text-white mb-12 text-center">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Latest News</span>
        </h2>
        
        <div className="flex justify-center mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`mx-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post, index) => (
            <div 
              key={index} 
              className="relative flex w-full flex-col rounded-xl bg-gray-400 bg-clip-border text-gray-900 shadow-lg dark:bg-gray-900 dark:text-whitetransition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
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
                <p className="text-gray-400 mb-1 text-sm">{post.date} • {post.author}</p>
                <h5 className="mb-2 text-2xl font-semibold leading-snug tracking-normal text-white">
                  {post.title}
                </h5>
                <p className="mb-4 text-gray-200 dark:text-gray-200">
                  {post.excerpt}
                </p>
                <a 
                  href={post.link}
                  className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-orange-500 py-3 px-6 text-center text-base font-bold uppercase text-white transition-all hover:shadow-lg focus:shadow-none hover:from-orange-500 hover:to-red-500"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link
            to="/Latest"
            className="mt-4 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 flex items-center "
          >
            More News <FaChevronDown />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Blog;