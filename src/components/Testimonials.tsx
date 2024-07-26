import React from 'react';
import { FaQuoteLeft, FaQuoteRight, FaCode, FaPalette, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  { 
    name: "Development Team", 
    quote: "Crafting innovative solutions with passion and precision, our developers turn ideas into reality.",
    icon: FaCode
  },
  { 
    name: "Design Team", 
    quote: "Blending creativity with functionality, our designers create visually stunning and user-friendly experiences.",
    icon: FaPalette
  },
  { 
    name: "Ideation Team", 
    quote: "Pushing boundaries and thinking outside the box, our ideation team sparks innovation at every turn.",
    icon: FaLightbulb
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          GMTStudio WorkSpace
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <testimonial.icon className="text-5xl text-blue-500 dark:text-blue-400" />
                </div>
                <blockquote className="text-center">
                  <FaQuoteLeft className="inline-block text-gray-400 dark:text-gray-600 mr-2" />
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic">
                    {testimonial.quote}
                  </p>
                  <FaQuoteRight className="inline-block text-gray-400 dark:text-gray-600 ml-2" />
                </blockquote>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 py-4">
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white">
                  {testimonial.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
