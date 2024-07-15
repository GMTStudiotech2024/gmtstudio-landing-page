import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaMobileAlt, FaLaptopCode, FaGamepad } from 'react-icons/fa';

const services = [
  { 
    title: "Design", 
    description: "Create stunning, user-centric designs that captivate and engage your audience. Our expert designers blend aesthetics with functionality to deliver memorable visual experiences.",
    icon: FaPalette,
    color: "text-pink-500"
  },
  { 
    title: "Application Development", 
    description: "Transform your ideas into powerful, scalable applications. We specialize in developing cross-platform mobile apps and robust desktop solutions tailored to your specific needs.",
    icon: FaMobileAlt,
    color: "text-blue-500"
  },
  { 
    title: "Website Development", 
    description: "Build responsive, fast, and visually appealing websites that leave a lasting impression. Our web development team ensures your online presence is both beautiful and functional.",
    icon: FaLaptopCode,
    color: "text-green-500"
  },
  { 
    title: "Game Development", 
    description: "Bring your game ideas to life with our cutting-edge development services. From casual mobile games to immersive VR experiences, we create engaging and innovative gaming solutions.",
    icon: FaGamepad,
    color: "text-purple-500"
  }
];

const AboutUs: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-900 dark:to-black text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-16 text-center tracking-wide"
        >
          About Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
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
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, color, isHovered, onHover, onLeave }) => {
  return (
    <motion.div 
      className="bg-gray-200 dark:bg-gray-800 p-8 rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Icon className={`text-4xl ${color} mr-4`} />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-black dark:text-gray-300 leading-relaxed mb-6">{description}</p>
      <motion.button 
        className={`px-4 py-2 rounded-full ${color} bg-opacity-200 hover:bg-opacity-200 transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More
      </motion.button>
      {isHovered && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

export default AboutUs;