import React from 'react';
import featureImage from '../assets/images/feature.png';

const Feature: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 w-full" data-aos="fade-right">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-700 to-purple-900 bg-clip-text text-transparent mb-6">
              Our Features
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              We offer an enhanced user interface and experience.
            </p>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li>By using React JS, we can design everything we want.</li>
              <li>After many meetings, we came up with a large number of ideas.</li>
              <li>By the way, is there an Easter egg on this website?</li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full mt-10 lg:mt-0 flex justify-center" data-aos="fade-left">
            <img src={featureImage} alt="Feature" className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feature;
