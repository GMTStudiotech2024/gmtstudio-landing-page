import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaMobileAlt, FaLaptopCode, FaGamepad } from 'react-icons/fa';

const services = [
  { 
    title: "Design", 
    description: "Create stunning, user-centric designs that captivate and engage your audience.",
    icon: FaPalette,
  },
  { 
    title: "App Development", 
    description: "Transform your ideas into powerful, scalable applications for mobile and desktop.",
    icon: FaMobileAlt,
  },
  { 
    title: "Web Development", 
    description: "Build responsive, fast, and visually appealing websites that leave a lasting impression.",
    icon: FaLaptopCode,
  },
  { 
    title: "Game Development", 
    description: "Bring your game ideas to life with our cutting-edge development services.",
    icon: FaGamepad,
  }
];

const AboutUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16 text-center"
        >
          Our Expertise
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index === activeIndex ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, isActive, onClick }) => {
  return (
    <motion.div 
      className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      layout
    >
      <div className="flex flex-col items-center text-center h-full">
        <Icon className="text-4xl mb-4" />
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 leading-relaxed"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        <motion.button 
          className="mt-4 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isActive ? 'Learn Less' : 'Learn More'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default AboutUs;