import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assetss/GMTStudio_p.png';

const NEWS15: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img 
            src={blogImage2} 
            alt="Theta Social Media Application" 
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mazs AI v1.0 anatra powered Website Generator is now available</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <span>By Alston Chang, Chief Executive Officer</span>
                <span className="mx-2">•</span>
                <span>April 01, 2024</span>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-6">
                after days of development, we finally have a new AI website generator powered by Mazs AI v1.0 anatra.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Project Highlights</h2>
              <p>
                Our Artificial intelligent related project is now available. you can find it in the sidebar and products page. 
                here is a list of all features:
                <ul>
                  <li>1. Mazs AI v1.0 anatra website generator</li>
                  <li>2. Mazs AI v1.0 anatra Search engine</li>
                  <li>3. Mazs AI v1.0 anatra Chatbot </li>
                </ul>
                </p>
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">We look forward to sharing more details about this exciting new project with you soon. Thank you for your continued support.</p>
              </div>
            </div>
          </div>
        </article>
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

export default NEWS15;
