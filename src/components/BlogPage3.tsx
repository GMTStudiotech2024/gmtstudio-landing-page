import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage3 from '../assets/images/blog7.png';

const BlogPage3: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Blog Post</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <img 
          src={blogImage3} 
          alt="Blog Post" 
          className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
        />
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          By Coworker on June 18, 2024
        </p>
        <div className="text-gray-900 dark:text-gray-100 leading-relaxed">
          <p>We don't have this Blog yet. This section is under construction and will be updated soon. Stay tuned for more exciting content!</p>
          <p>Meanwhile, feel free to explore our other blog posts and learn about various interesting topics and updates.</p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <button 
          onClick={handleBackToBlog} 
          className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Blog
        </button>
      </footer>
    </div>
  );
}

export default BlogPage3;
