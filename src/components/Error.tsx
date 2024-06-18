import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 dark:bg-gray-900 p-4">
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300 ease-in-out max-w-lg">
        <FaExclamationTriangle className="text-6xl text-red-600 dark:text-red-400 mb-4 animate-pulse mx-auto" />
        <h1 className="text-9xl font-bold text-red-600 dark:text-red-400 mb-8 animate-pulse">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">Oops! Page Not Found</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go Home
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Go Back
          </button>
        </div>
        <div className="mt-8 text-gray-600 dark:text-gray-400">
          <p>Here are some helpful links:</p>
          <ul className="mt-4 space-y-2">
            <li><a href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">About Us</a></li>
            <li><a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</a></li>
            <li><a href="/services" className="text-blue-600 dark:text-blue-400 hover:underline">Our Services</a></li>
            <li><a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">Blog</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Error;
