import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage3 from '../assets/images/Story.jpg';

const BlogPage3: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Story Vending machine</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <img 
          src={blogImage3} 
          alt="Blog Post" 
          className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
        />
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          By Alston on July, 1 , 2024
        </p>
        <div className="text-gray-900 dark:text-gray-100 leading-relaxed">
          <p>Hello guys ! I am happy to announce a new application that can make you more friend, and getting know with each other more and more </p>
          <p>Today I am going to introduce our latest product called Story Vending Machine, We are currently developing the User Interface or so called Front-end of this website! </p>
          <p>You might wondering what is this, well this is the answer of your question, Story vending machine is an platform that you can share your daily lifes, your interest, all you want to share, and when people spent their tokens randomly gets your story, you got that token, the token is used to see others lives, get GMTStudio VIP, the Free test of Mazs AI, and even more.  </p>
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
