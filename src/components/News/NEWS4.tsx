import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assets/GMTStudio_p.png';

const NEWS4: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Enhance Database of AI</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <span>By Alston Chang, Chief Executive Officer</span>
                <span className="mx-2">•</span>
                <span>June 20, 2024</span>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-6">
                We are pleased to announce that we have made significant enhancements to our AI's database. The current AI version is now v0.61.2, bringing improved performance and new capabilities.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Key Improvements</h2>
              <p>
                The new version includes several updates that enhance the efficiency and accuracy of our AI system. These improvements are designed to provide a better user experience and more reliable results.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">What's New</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Optimized data processing algorithms for faster performance.</li>
                <li>Enhanced machine learning models for greater accuracy.</li>
                <li>Expanded database with new data entries and insights.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Future Plans</h2>
              <p>
                We are committed to continuously improving our AI system. Future updates will focus on integrating more advanced features and further enhancing the database to meet the evolving needs of our users.
              </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Thank you for your support as we strive to enhance our AI's capabilities. We look forward to bringing you more exciting updates in the near future.</p>
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

export default NEWS4;
