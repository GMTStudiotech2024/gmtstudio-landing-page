import React from 'react';
import screenshot from '../assets/images/screenshot.png';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2" data-aos="fade-right">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to the Future of technology
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            GMTStudio wants to create some tools and application that can enhance User's experience
          </p>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Get started
            </button>
            <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
              Learn more
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0" data-aos="fade-left">
          <img src={screenshot} alt="Screenshot" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
