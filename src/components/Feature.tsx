import React from 'react';

const features = [
  { title: 'Feature One', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Feature Two', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Feature Three', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  // Add more features as needed
];

const Feature: React.FC = () => {
  return (
    <section id="features" className="features-section py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
        <div className="flex flex-wrap justify-center">
          {features.map((feature, index) => (
            <div className="w-full md:w-1/3 p-4" data-aos="fade-up" data-aos-delay={`${index * 100}`} key={index}>
              <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;
