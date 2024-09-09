import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import projectImage2 from '../assets/images/blog5.png';
import projectImage3 from '../assets/images/Story.jpg';
import game_ohmypc from '../assets/images/Game_ohmypc.jpg';
import game_dungeon from '../assets/images/Game_dungeon.jpg';
import AI from '../assets/images/AI.png'
import { faRocket, faExclamationCircle, faGlobe, faCompass } from '@fortawesome/free-solid-svg-icons';
const projects = [
  {
    title: 'GMTStudio AI WorkSpace',
    description: 'GMTStudio designed their own AI, MAZS AI. Although it is still in development, you can use it!',
    image: AI,
    link: '/mazsai',
    icon: faRocket,
    isInternal: false,
    color: 'from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900',
    category: 'AI',
  },
  {
    title: 'GMTStudio Story Vending Machine',
    description: 'New Ideas in GMTStudio, We are currently developing the front end! ',
    image: projectImage3,
    link: '/NEWS8',
    icon: faExclamationCircle,
    isInternal: true,
    color: 'from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900',
    category: 'Innovation',
  },
  {
    title: 'Theta Social Media Platform',
    description: 'Using Appwrite and Vite, we designed one of the greatest social media platforms of all time.',
    image: projectImage2,
    link: 'https://theta-plum.vercel.app/',
    icon: faGlobe,
    isInternal: false,
    color: 'from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900',
    category: 'Web',
  },
  {
    title: 'Game - Oh My pc',
    description: 'A game that simulate a person who has a bad pc but want to be a youtuber or developer, which he has to make content that is viral to get money ',
    image: game_ohmypc,
    link: '/game-1',
    icon: faCompass,
    isInternal: true,
    color: 'from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900',
    category: 'Game',
  },
  {
    title: 'Game - (not decided yet)',
    description: 'A game that simulate a person who has a bad pc but want to be a youtuber or developer, which he has to make content that is viral to get money ',
    image: game_dungeon,
    link: '/game-2',
    icon: faCompass,
    isInternal: true,
    color: 'from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900',
    category: 'Game',
  },
];

const OurProjects: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(projects.length / (isMobile ? 1 : 3)));
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile]);

  const handleProjectClick = (link: string, isInternal: boolean) => {
    if (isInternal) {
      navigate(link);
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-white"
        >
          Innovations at GMTStudio
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {projects.slice(currentSlide * (isMobile ? 1 : 3), currentSlide * (isMobile ? 1 : 3) + (isMobile ? 1 : 3)).map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
                whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <button 
                    onClick={() => handleProjectClick(project.link, project.isInternal)}
                    className="w-full bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                  >
                    <span>Learn More</span>
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-xs" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(projects.length / (isMobile ? 1 : 3)) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full mx-1 ${
                currentSlide === index ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
