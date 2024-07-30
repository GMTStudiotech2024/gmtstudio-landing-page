import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaMobileAlt, FaLaptopCode, FaGamepad } from 'react-icons/fa';
import AnimatedItem from './AnimatedItem';

const services = [
  { 
    title: "Design", 
    description: "Create stunning, user-centric designs that captivate and engage your audience.",
    icon: FaPalette,
    color: "bg-purple-500"
  },
  { 
    title: "App Development", 
    description: "Transform your ideas into powerful, scalable applications for mobile and desktop.",
    icon: FaMobileAlt,
    color: "bg-blue-500"
  },
  { 
    title: "Web Development", 
    description: "Build responsive, fast, and visually appealing websites that leave a lasting impression.",
    icon: FaLaptopCode,
    color: "bg-green-500"
  },
  { 
    title: "Game Development", 
    description: "Bring your game ideas to life with our cutting-edge development services.",
    icon: FaGamepad,
    color: "bg-red-500"
  }
];

const AboutUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <h2 className="text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Our Expertise
          </h2>
        </AnimatedItem>
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
  color: string;
  isActive: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, color, isActive, onClick }) => {
  return (
    <AnimatedItem>
      <motion.div 
        className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-${color} ${isActive ? `border-${color}` : ''}`}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        layout
      >
        <div className="flex flex-col items-center text-center h-full">
          <div className={`${color} text-white p-4 rounded-full mb-6`}>
            <Icon className="text-3xl" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <AnimatePresence>
            {isActive && (
              <motion.p 
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
          <motion.button 
            className={`mt-6 px-6 py-2 rounded-full ${color} text-white font-semibold hover:opacity-90 transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive ? 'Learn Less' : 'Learn More'}
          </motion.button>
        </div>
      </motion.div>
    </AnimatedItem>
  );
}

export default AboutUs;