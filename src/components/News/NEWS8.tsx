import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assetss/GMTStudio_p.png';

const NEWS8: React.FC = () => {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleBackToBlog = () => {
    navigate('/');
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    // Here you would typically handle the subscription logic
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img 
            src={blogImage2} 
            alt="Front-end Development Illustration" 
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Exciting Progress in Front-end Development</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Alston Chang</p>
                <p className="text-sm">Chief Executive Officer</p>
                <p className="text-sm">July 21, 2024 • 3 min read</p>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-4">We're thrilled to share an update on the front-end development of our exciting "New Project". While we can't reveal all the details just yet, we wanted to give our community a sneak peek into what we're working on.</p>
              
              <h2 className="text-2xl font-bold mt-6 mb-3">What We're Building</h2>
              <p>Our team is hard at work creating a cutting-edge user interface that will set new standards in user experience and design. We're focusing on:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Intuitive navigation and information architecture</li>
                <li>Responsive design for seamless experiences across all devices</li>
                <li>Accessibility features to ensure our product is usable by everyone</li>
                <li>Performance optimizations for lightning-fast load times</li>
              </ul>

              <h2 className="text-2xl font-bold mt-6 mb-3">Technologies We're Using</h2>
              <p>We're leveraging the latest front-end technologies to bring our vision to life:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>React for building our component-based UI</li>
                <li>TypeScript for improved code quality and developer experience</li>
                <li>Tailwind CSS for rapid, customizable styling</li>
                <li>Next.js for server-side rendering and optimal performance</li>
              </ul>

              <p>While we can't share specific details about the project just yet, we're confident that it will revolutionize the way our users interact with our platform. Stay tuned for more updates coming soon!</p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Want to be the first to know when we launch?</p>
                {!isSubscribed ? (
                  <button 
                    onClick={handleSubscribe}
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                  >
                    Subscribe for Updates
                  </button>
                ) : (
                  <p className="mt-2 text-blue-800 dark:text-blue-200">Thanks for subscribing! We'll keep you posted.</p>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default NEWS8;