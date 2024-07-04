import React from 'react';
import blogImage1 from '../assets/images/MazsAiPic.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/Story.jpg';

const blogPosts = [
  { 
    image: blogImage3, 
    title: "Story Vending Machine", 
    excerpt: "New project idea from GMTStudio", 
    author: "Alston Chang", 
    date: "July 1, 2024",
    link: "/BlogPage3"
  },
  { 
    image: blogImage1, 
    title: "MAZS AI", 
    excerpt: "GMTStudio Ai workspace provides the service of Artificial Intelligence.", 
    author: "Alston Chang",
    date: "June 17, 2024",
    link: "/BlogPage1"
  },
  { 
    image: blogImage2, 
    title: "Theta Social Media Application", 
    excerpt: "The newly designed website application, which was recently updated.", 
    author: "Lucus Yeh", 
    date: "May 25, 2024",
    link: "/BlogPage2"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Our Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md dark:bg-gray-900 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="p-8">
                <p className="text-gray-500 dark:text-gray-400 mb-1">{post.date}</p>
                <h5 className="mb-2 text-2xl font-semibold leading-snug tracking-normal text-gray-900 dark:text-white">
                  {post.title}
                </h5>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {post.excerpt}
                </p>
                <a 
                  href={post.link}
                  className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-orange-500 py-3 px-6 text-center text-base font-bold uppercase text-white transition-all hover:shadow-lg focus:shadow-none"
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

export default Blog;
