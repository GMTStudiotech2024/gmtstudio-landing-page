import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  { name: "John Doe", quote: "This company provided exceptional service and delivered on time." },
  { name: "Jane Smith", quote: "Highly professional and great attention to detail." },
  { name: "Bob Johnson", quote: "Outstanding quality and customer support." }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-10 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Testimonials</h2>
        <div className="flex justify-center space-x-4" data-aos="fade-up">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
              <FaQuoteLeft className="text-2xl text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
              <FaQuoteRight className="text-2xl text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
