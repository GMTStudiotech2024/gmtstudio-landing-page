import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="about-section py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 p-4" data-aos="fade-right">
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p>We are trying to enhance user's life and create some cool game </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4" data-aos="fade-left">
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p>We hope to develop our first game in 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
