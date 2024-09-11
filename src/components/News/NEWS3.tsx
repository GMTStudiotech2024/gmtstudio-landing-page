import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assetss/GMTStudio_p.png';

const NEWS3: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Launch GMTStudio AI Workspace</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <span>By Alston Chang, Chief Executive Officer</span>
                <span className="mx-2">•</span>
                <span>May 26, 2024</span>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-6">
                We are thrilled to announce the launch of GMTStudio AI Workspace, our new Artificial Intelligence Lab. This platform allows users to access and utilize our AI services for free, empowering innovation and creativity.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">About GMTStudio AI Workspace</h2>
              <p>
                GMTStudio AI Workspace is designed to provide a collaborative environment where users can explore, experiment, and develop AI-driven solutions. Our aim is to make AI accessible to everyone, fostering a community of learning and growth.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Access to powerful AI tools and resources.</li>
                <li>User-friendly interface for easy navigation and use.</li>
                <li>Support for a wide range of AI applications and projects.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Get Started</h2>
              <p>
                To get started with GMTStudio AI Workspace, simply sign up on our website and begin exploring the available AI tools and resources. Our team is here to support you every step of the way.
              </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Join us in revolutionizing the AI landscape with GMTStudio AI Workspace. We look forward to seeing the incredible innovations you'll create.</p>
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

export default NEWS3;
