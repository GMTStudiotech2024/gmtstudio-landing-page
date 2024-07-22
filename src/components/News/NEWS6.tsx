import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assets/GMTStudio_p.png';

const NEWS6: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <img 
          src={blogImage2} 
          alt="Theta Social Media Application" 
          className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-black dark:text-white text-4xl">Bug Fixed</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          By Alston Chang, July 20, 2024
        </p>
        <div className="text-gray-900 dark:text-gray-100 leading-relaxed">
          <p>Theta Social Media Application has recently undergone a major update, bringing a fresh new design and enhanced features to its users. The updated interface is more intuitive and user-friendly, allowing for a smoother experience.</p>
          <p>New features include enhanced privacy settings, more robust content sharing options, and integration with other popular social media platforms. The update aims to provide users with more control over their online presence and improve the overall user experience.</p>
          <p>Stay connected with your friends and family, share your moments, and enjoy the new and improved Theta Social Media Application.</p>
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

export default NEWS6;
