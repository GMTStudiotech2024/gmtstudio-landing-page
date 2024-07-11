import React from 'react';

const services = [
  { title: "Design", description: "Newly designed product" },
  { title: "Application Development", description: "We will turn our website into an application" },
  { title: "Website Development", description: "Designing responsive and visually appealing websites." },
  { title: "Game Development", description: "Creating an cool and great game" }
];

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-900 dark:bg-gray-900 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white dark:text-white mb-12 text-center tracking-wide">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-700 dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold text-white dark:text-white mb-4">{title}</h3>
      <p className="text-white dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

export default AboutUs;
