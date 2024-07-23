import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assets/GMTStudio_p.png';

const NEWS5: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">New Project in Queue</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <span>By Alston Chang, Chief Executive Officer</span>
                <span className="mx-2">•</span>
                <span>July 01, 2024</span>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-6">
                We are excited to announce that we have a new project in the pipeline. Our team is currently working on this innovative idea, and we can't wait to share more details with you soon.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Project Overview</h2>
              <p>
                While we can't reveal too much just yet, we assure you that this project aims to bring significant improvements and exciting features to our platform. Stay tuned for more updates as we progress with the development.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">What to Expect</h2>
              <p>
                Our team is dedicated to delivering high-quality products and services. This new project is no exception, and we are putting in all our efforts to ensure it meets your expectations. We will provide more detailed news and updates as the project reaches key milestones.
              </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Thank you for your continued support and enthusiasm for our work. We look forward to sharing more about this exciting new project soon.</p>
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

export default NEWS5;
