import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assetss/GMTStudio_p.png';

const NEWS18: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Website migration</h1>
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
                We change our website's domain to https://tech-gmt.vercel.app/  to better serve our users.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">What things change: </h2>
              <p>
                 first, we added some new feature to our service 
                <p>For Mazs AI API page, you will need to send us an Email or fill out a form to get waitlist.</p>
                <p>We Enhance our website by updating new icons, and make  our website more user-friendly.</p>
                </p>
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">We look forward to sharing more details about this exciting new project with you soon. Thank you for your continued support.</p>
                <p className="font-semibold text-black dark:text-white">Also, We added some easter in the website, please find it and enjoy the reward.</p>
              </div>
              <h2  className="text-2xl font-semibold mt-8 mb-4">What things not change:
                <p>We did not move the MazsAI domain to another one, so  you can still access it at https://mazs-ai-lab.vercel.app/ </p>
                <p>Our website still support Mazs AI preview for user to use, powered by Mazs AI anatra v1.3.5</p>
               </h2> 
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

export default NEWS18;
