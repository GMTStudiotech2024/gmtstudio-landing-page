import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <section id="contact" className="contact-section py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-12">Contact Us</h2>
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2 p-4">
            <form className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">Name</label>
                <input 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" 
                  type="text" 
                  id="name" 
                  placeholder="Your Name" 
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">Email</label>
                <input 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" 
                  type="email" 
                  id="email" 
                  placeholder="Your Email" 
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="message">Message</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" 
                  id="message" 
                  placeholder="Your Message" 
                  rows={5} 
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button 
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 transition duration-300 ease-in-out" 
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
