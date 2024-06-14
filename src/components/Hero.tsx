import React from 'react';
import screenshot from '../assets/images/screenshot.png';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2 w-full" data-aos="fade-right">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Deploy to the cloud with confidence
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
            Elit sunt amet fugiat veniam occaecat fugiat aliqua.
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
        <div className="lg:w-1/2 w-full mt-10 lg:mt-0 flex justify-center" data-aos="fade-left">
          <img src={screenshot} alt="Screenshot" className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
