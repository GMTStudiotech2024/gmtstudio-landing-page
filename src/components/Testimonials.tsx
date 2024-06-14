import React from 'react';

const testimonials = [
  { name: 'John Doe', feedback: 'Great service! Highly recommend.' },
  { name: 'Jane Smith', feedback: 'The team is very professional and skilled.' },
  { name: 'Samuel Green', feedback: 'Excellent work on our project!' },
  // Add more testimonials as needed
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="testimonials-section py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <div className="w-full md:w-1/2 lg:w-1/3 p-4" data-aos="fade-up" data-aos-delay={`${index * 100}`} key={index}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="mb-4">"{testimonial.feedback}"</p>
                <h3 className="text-2xl font-bold">{testimonial.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

