import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  { name: "About Dev Group", quote: "The Develop Group Is the Group that Writes code, which their Liver were broken CPU overheat and mentally a duck" },
  { name: "About Design Group", quote: "The Design group is the Group the design Our Styles, which their Liver were broken as well and their CPU were also broken" },
  { name: "About Idea Group", quote: "The Idea group is the group that Their CPU are over heat and I hope Their Liver are good, but the truth is Their Liver were broken as well" }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-10 bg-black dark:bg-gray-900 justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white dark:text-white mb-8">GMTStudio WorkSpace</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="max-w-sm p-6 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
              <FaQuoteLeft className="text-2xl text-white dark:text-gray-600 mb-4" />
              <p className="text-lg text-white dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
              <FaQuoteRight className="text-2xl text-white dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-500 dark:text-white">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
