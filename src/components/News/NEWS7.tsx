import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assets/GMTStudio_p.png';

const NEWS7: React.FC = () => {
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
            alt="GMTStudio Database Visualization" 
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Important Notice: Recent Database Issue and Our Response</h1>
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
                We regret to inform our users that we recently experienced a database error which resulted in the loss of some user data. We take this incident very seriously and want to provide you with a full explanation of what happened, the steps we're taking to rectify the situation, and our plans to prevent such occurrences in the future.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">What Happened</h2>
              <p>
                On July 19, 2024, at approximately 2:30 PM EDT, our engineering team detected an anomaly in our primary database cluster. Upon investigation, we discovered that a recent system update had inadvertently caused data corruption, affecting approximately 2% of our user accounts.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Immediate Actions Taken</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>We immediately halted all write operations to the affected database to prevent further data loss.</li>
                <li>Our team initiated our disaster recovery protocol and began restoring from our most recent backup.</li>
                <li>We've set up a dedicated support line for affected users to address their concerns and assist with any data recovery needs.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Next Steps</h2>
              <p>
                We are committed to resolving this issue and ensuring it doesn't happen again. Here's what we're doing:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Conducting a thorough audit of our database systems and update procedures.</li>
                <li>Implementing additional safeguards and validation checks in our update process.</li>
                <li>Enhancing our real-time monitoring and alert systems to detect similar issues more quickly in the future.</li>
                <li>Providing affected users with a complimentary 6-month subscription extension as a gesture of goodwill.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">For Affected Users</h2>
              <p>
                If you believe your account has been affected, please contact our support team at support@gmtstudio.com or call our dedicated hotline at 1-800-555-0199. Our team is standing by to assist you with any concerns or questions you may have.
              </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">We sincerely apologize for any inconvenience this may have caused. Your trust is paramount to us, and we are committed to earning it every day.</p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default NEWS7;