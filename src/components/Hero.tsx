import React from 'react';
import video from '../assets/images/blogImage1.mp4';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900 h-screen flex items-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0" data-aos="fade-right">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">GMTStudio!</span>
          </h1>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Beyond Code, Beyond Limits.
          </p>
          <p className="text-base mb-6 text-gray-700 dark:text-gray-300">
            Discover innovative software solutions with GMTStudio Tech. We specialize in web and mobile app development, creating custom software to meet your needs.
          </p>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center" data-aos="fade-left">
          <video className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

export default Hero;
