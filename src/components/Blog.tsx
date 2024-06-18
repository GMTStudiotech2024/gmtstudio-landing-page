import React from 'react';
import blogImage1 from '../assets/images/blog4.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/blog7.png';

const blogPosts = [
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
  },
  { 
    image: blogImage3, 
    title: "Blog Post ", 
    excerpt: "We don't have this Blog yet ", 
    author: "Coworker", 
    date: "June 18, 2024",
    link: "/BlogPage3"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Our Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" data-aos="zoom-out-up">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out bg-gray-100 dark:bg-gray-900"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  By {post.author} on {post.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <a 
                  href={post.link} 
                  className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
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
