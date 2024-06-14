import React from 'react';
import featureImage from '../assets/images/feature.png';

const Feature: React.FC = () => {
  return (
    <section id="features" className="py-10 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 w-full" data-aos="fade-right">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Features</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Explore the features that we offer to make your experience better and more efficient.
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300">
              <li>Feature one that is really cool</li>
              <li>Feature two that is even cooler</li>
              <li>Feature three that is the coolest of all</li>
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
