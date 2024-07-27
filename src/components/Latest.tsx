import React, { useState } from 'react';
import blogImage1 from '../assets/images/MazsAiPic.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/Story.jpg';
import Theta from '../assets/images/feature.png';
import ThetaDev from '../assets/images/large-image.png';
import WebDev from '../assets/images/1.png'

const blogPosts = [
  {
    image: WebDev,
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
        
        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`mx-2 my-1 px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post, index) => (
            <div 
              key={index} 
              className="relative flex w-full flex-col rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
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
                <p className="text-gray-500 mb-1 text-sm">{post.date} • {post.author}</p>
                <h5 className="mb-2 text-2xl font-semibold leading-snug tracking-normal text-gray-900 dark:text-white">
                  {post.title}
                </h5>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
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
      </div>
    </section>
  );
}

export default Latest;
