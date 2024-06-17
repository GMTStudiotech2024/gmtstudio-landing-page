import React from 'react';
import screenshot from '../assets/images/screenshot.png';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0" data-aos="fade-right">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">GMTStudio!</span>
          </h1>
          <p className="bg-gradient-to-r from-slate-500 via-violet-600 to-slate-800 bg-clip-text text-transparent mb-6 dark:bg-gradient-to-r dark:from-amber-200 dark:to-yellow-500">
            Unlocking new possibilities, Beyond Code, Beyond Limits. 
          </p>
          <span className="bg-gradient-to-r from-sky-400 via-violet-600 to-lime-300 bg-clip-text text-transparent">
          Welcome to GMTStudio Tech, your destination for innovative software solutions. We specialize in web and mobile app development, offering custom software tailored to your needs. Our expert team is committed to delivering high-quality products that drive business growth and success. Explore how we can transform your digital landscape.
            </span>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-green-500  dark:hover:bg-green-600" >
              Get started
            </button>
            <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white dark:border-green-500 dark:hover:bg-green-500 dark:text-green-500 dark:hover:text-white ">
              Learn more
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center" data-aos="fade-left">
          <img src={screenshot} alt="Screenshot" className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
