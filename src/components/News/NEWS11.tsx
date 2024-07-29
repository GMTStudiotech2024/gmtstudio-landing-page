import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assets/GMTStudio_p.png';

const NEWS11 = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);

  const handleBackToBlog = () => {
    navigate('/');
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <img 
            src={blogImage2} 
            alt="GMTStudio AI Workspace Interface" 
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">GMTStudio Beta Release</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <img src="/api/placeholder/48/48" alt="Author" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Alston Chang</p>
                <p className="text-sm">Chief Executive Officer</p>
                <p className="text-sm">July 24, 2024 • 5 min read</p>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-6">We added some new feature to our official website, let's hop into the introduction of the new feature!</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Key Improvements</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Update News page: we made a page that is for company developer who has already Sign up to our website, and they can see the coolest design we make </li>
                <li>Cursor improvement : we took the cursor design to the higher level </li>
                <li>Sign Up and Login: if you are a developer, or our company member, you can go and apply the account of our website to try the new things</li>
                <li>Enhanced Visualization : More improved UI and UX helps user to get use to our website better </li>
                
              </ul>

              <p>These updates are just the beginning. We're going to update more and more feature for you </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">What's Next?</h2>
              <p>We have a lot of things that can improve</p>
              <ul className="list-disc pl-6 mb-6">
                <li>enhance UI</li>
                <li>make more cool stuff for all of you </li>
                <li>more components for website </li>
              </ul>

              <p>Stay tuned for more updates as we continue to refine and enhance the GMTStudio AI Workspace. We're committed to supporting the AI community with cutting-edge tools that drive innovation and discovery.</p>
            </div>
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Apply the GMTStudio developer program</p>
                <a href="https://forms.gle/UQ4CcHKZxKZ7McXcA" className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">Sign Up </a>
              </div>
          </div>
          <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
            <button onClick={handleLike} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{likes} Likes</span>
            </button>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default NEWS11;