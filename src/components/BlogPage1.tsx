import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage1 from '../assets/images/GMTStudio-AI_studio.png';

const BlogPage1: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">MAZS AI</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <img 
          src={blogImage1} 
          alt="MAZS AI" 
          className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
        />
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          By Alston Chang on June 17, 2024
        </p>
        <div className="text-gray-900 dark:text-gray-100 leading-relaxed">
          <p>GMTStudio Ai workspace provides the service of Artificial Intelligence. It leverages state-of-the-art machine learning models and algorithms to offer a wide range of AI-powered solutions, from natural language processing to computer vision.</p>
          <p>With a user-friendly interface and robust functionality, it allows users to integrate AI seamlessly into their projects and operations, enhancing efficiency and productivity.</p>
          <p>Whether you're looking to automate routine tasks or gain insights from large datasets, GMTStudio Ai has the tools and resources you need to succeed.</p>
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

export default BlogPage1;
