import React from 'react';
import video from '../assets/images/blogImage1.mp4';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900 h-screen flex items-center relative">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0" data-aos="fade-right">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      Welcome to <span className="animated-gradient">GMTStudio!</span>
    </h1>
          <h2 className="text-3xl mb-6 bg-gradient-to-r from-purple-500 to-purple-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Beyond Code, Beyond Limits.
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We create innovative solutions that push the boundaries of technology. Join us on our journey to redefine the future.
          </p>
          <a href="#OurProjects" className="inline-block px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition duration-300">
            Learn More
          </a>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center relative" data-aos="fade-left">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-500 opacity-50 rounded-lg shadow-lg"></div>
          <video className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative z-10" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

export default Hero;
