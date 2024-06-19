import React from 'react';
import featureImage from '../assets/images/feature.png'; // Update this to the correct path of your image

const features = [
  {
    title: 'Customizable Themes',
    description: 'Easily customize themes to match your brand and style preferences. Choose from a variety of color schemes and layouts.',
    icon: '🎨',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Collaborate with your team in real-time, making it easy to share ideas, make decisions, and work together efficiently.',
    icon: '🤝',
  },
  {
    title: 'Seamless Integration',
    description: 'Integrate seamlessly with your existing tools and platforms, ensuring a smooth and consistent workflow across all your applications.',
    icon: '🔗',
  },
];

const Feature: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature Introduction */}
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0" data-aos="fade-right">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-700 to-purple-900 bg-clip-text text-transparent mb-6">
              Our Features
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              We offer an enhanced user interface and experience with the following features:
            </p>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li>Highly customizable components to suit your needs.</li>
              <li>Responsive design that looks great on any device.</li>
              <li>Optimized performance for a smooth user experience.</li>
              <li>Integrated with the latest technologies for best practices.</li>
              <li>Comprehensive documentation and support.</li>
              <li>Advanced security features to protect your data.</li>
              <li>Regular updates with new features and improvements.</li>
            </ul>
            <a
              href="#more-features"
              className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300"
            >
              Learn More
            </a>
          </div>
          {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center relative" data-aos="fade-left">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-500 opacity-50 rounded-lg shadow-lg"></div>
            <img 
              src={featureImage} 
              alt="Feature" 
              className="relative z-10 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" 
            />
          </div>
        </div>
        {/* Additional Features */}
        <div id="more-features" className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            More Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                className="feature-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                {feature.icon ? (
                  <div className="text-6xl mb-4">{feature.icon}</div>
                ) : (
                  <div className="flex justify-center mb-4">
                    <img  
                      alt={feature.title} 
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                )}
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feature;
