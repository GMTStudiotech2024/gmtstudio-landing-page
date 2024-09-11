import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assetss/GMTStudio_p.png';
import { ChevronLeft, Calendar, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
const NEWS1: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col ">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={handleBackToBlog} className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition duration-300">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white pt-20">GMT Studio Blog</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-24">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img 
              src={blogImage2} 
              alt="Theta Social Media Application" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">New Project in Queue</h2>
            <div className="flex items-center space-x-4 mb-6">
              <img src="/placeholder-avatar.jpg" alt="Author" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold text-lg text-gray-900 dark:text-white">Alston Chang</p>
                <p className="text-gray-600 dark:text-gray-400">Chief Executive Officer</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
              <Calendar className="mr-2 h-4 w-4" />
              <span>April 01, 2024</span>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="text-xl mb-6">
                We are excited to announce that we are currently developing a new project: a revolutionary social media application. This new endeavor aims to transform the way people connect and share their experiences online.
              </p>

              <h3 className="text-2xl font-semibold mt-10 mb-4">Project Highlights</h3>
              <p className="mb-4">
                Our upcoming social media application will feature:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>A sleek, user-friendly interface</li>
                <li>Robust privacy settings</li>
                <li>Seamless integration with other popular platforms</li>
              </ul>
              <p className="mb-4">
                Our team is dedicated to creating a secure and engaging platform where users can connect, share, and discover new content. We're focusing on:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Enhanced user experience</li>
                <li>Advanced security measures</li>
                <li>Innovative content discovery algorithms</li>
              </ul>

              <div className="mt-10 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Stay tuned for more updates as we progress with the development. We look forward to sharing more details about this exciting new project with you soon!</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center flex-wrap">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <button className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-300">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-300">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comment
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-300">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </button>
            </div>
            <button 
              onClick={handleBackToBlog}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Return to Blog
            </button>
          </div>
        </article>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 GMT Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NEWS1;
