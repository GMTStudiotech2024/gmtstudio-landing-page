import React from 'react';
import blogImage1 from '../assets/images/blog1.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/blog3.png';

const blogPosts = [
  { image: blogImage1, title: "Blog Post One", excerpt: "A brief excerpt of the first blog post." },
  { image: blogImage2, title: "Blog Post Two", excerpt: "A brief excerpt of the second blog post." },
  { image: blogImage3, title: "Blog Post Three", excerpt: "A brief excerpt of the third blog post." }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-10 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {blogPosts.map((post, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6 bg-gray-100 dark:bg-gray-900">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
