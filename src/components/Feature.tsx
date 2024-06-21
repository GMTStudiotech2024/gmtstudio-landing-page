import React from 'react';
import featureImage from '../assets/images/feature.png'; // Update this to the correct path of your image

const features = [
  {
    title: 'Muti Annoy Zone Server Artificial Intelligence \n MAZS AI',
    description: 'The MAZS AI is a Chat bot that Uses NLP (Natural language processing) and response unproperly and Annoy the users',
    amount: 'Unlimited',
    status: 'Successfully Launched',
  },
  {
    title: 'Enhanced Database',
    description: 'By using the new type of storing database, the MAZS AI and all the other application can provide better user experience',
    status: 'For all users',
  },
  {
    title: 'Analytics',
    description: 'There are no Analytics but just a few Braincells left over here',
    currency: '99+',
    balance: 'Ya, Nothing but braincells',
  },
];

const Feature: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature Introduction */}
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12 mb-12">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0" data-aos="fade-right">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 via-purple-700 to-purple-900 bg-clip-text">
              Our Features
            </h2>
            <p className="text-lg mb-6">
              We offer an enhanced user interface and experience with the following features:
            </p>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li>Highly customizable components to suit your needs.</li>
              <li>Responsive design that looks great on any device.</li>
              <li>Optimized performance for a smooth user experience.</li>
              <li>Integrated with the latest technologies for best practices.</li>
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
        <div id="more-features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                className="feature-card p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <h4 className="text-2xl font-semibold mb-4 text-white whitespace-pre-line">
                  {feature.title}
                </h4>
                <p className="text-lg text-gray-300 mb-4">
                  {feature.description}
                </p>
                {feature.amount && (
                  <p className="text-4xl font-bold mb-4 blink-animation">
                    {feature.amount}
                  </p>
                )}
                {feature.status && (
                  <p className="text-green-400 mb-4">
                    {feature.status}
                  </p>
                )}
                {feature.currency && (
                  <div className="text-lg text-yellow-400">
                    Braincell count: {feature.currency}
                  </div>
                )}
                {feature.balance && (
                  <div className="text-4xl font-bold text-white">
                    {feature.balance}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;

// CSS
const styles = `
  @keyframes blink {
    0% { color: black; }
    50% { color: white; }
    100% { color: black; }
  }
  .blink-animation {
    animation: blink 1s infinite;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
