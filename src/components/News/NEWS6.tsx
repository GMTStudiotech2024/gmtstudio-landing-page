import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assetss/GMTStudio_p.png';

const NEWS6: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Bug Fixed: Theta Social Media Application</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <span>By Alston Chang, Chief Executive Officer</span>
                <span className="mx-2">•</span>
                <span>July 20, 2024</span>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-6">
                We are pleased to announce that we have identified and resolved a bug in the Theta Social Media Application. This issue was causing disruptions for some users, but our team worked diligently to find a solution and ensure the app runs smoothly for everyone.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Details of the Bug</h2>
              <p>
                The bug was identified on July 19, 2024, during routine testing. It was causing unexpected behavior in the user interface, leading to a suboptimal user experience.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Steps Taken to Fix the Bug</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Our development team quickly isolated the issue and identified the root cause.</li>
                <li>A patch was developed and tested extensively to ensure it resolved the problem without introducing new issues.</li>
                <li>The patch was deployed during a maintenance window to minimize disruption to users.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Looking Forward</h2>
              <p>
                We remain committed to providing a seamless and enjoyable experience for our users. Our team will continue to monitor the application and address any issues promptly. Your feedback is invaluable to us, and we encourage you to report any problems you encounter.
              </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Thank you for your patience and understanding as we work to improve your experience with the Theta Social Media Application.</p>
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

export default NEWS6;
