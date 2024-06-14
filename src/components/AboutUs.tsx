import React from 'react';

const services = [
  { title: "Software Design", description: "Crafting innovative and user-friendly software solutions." },
  { title: "Application Development", description: "Building mobile and web applications tailored to your needs." },
  { title: "Website Design", description: "Designing responsive and visually appealing websites." },
  { title: "Game Development", description: "Creating immersive and engaging gaming experiences." }
];

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-10 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
