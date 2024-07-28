import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faExclamationCircle, faGlobe, faRocket, faCompass } from '@fortawesome/free-solid-svg-icons';
import projectImage1 from '../assets/images/MazsAiPic.png';
import projectImage2 from '../assets/images/blog5.png';
import projectImage3 from '../assets/images/Story.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import game_ohmypc from '../assets/images/Game_ohmypc.jpg';
import game_dungeon from '../assets/images/Game_dungeon.jpg';
const projects = [
  {
    title: 'GMTStudio AI WorkSpace',
    description: 'GMTStudio designed their own AI, MAZS AI. Although it is still in development, you can use it!',
    image: projectImage1,
    link: 'https://gmt-studio-ai-workspace.vercel.app/',
    icon: faRocket,
    isInternal: false,
    color: 'from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900',
    category: 'AI',
  },
  {
    title: 'GMTStudio Story Vending Machine',
    description: 'New Ideas in GMTStudio, We are currently developing the front end! ',
    image: projectImage3,
    link: '/',
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
    link: '/',
    icon: faCompass,
    isInternal: true,
    color: 'from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900',
    category: 'Game',
  },
  {
    title: 'Game - (not decided yet)',
    description: 'A game that simulate a person who has a bad pc but want to be a youtuber or developer, which he has to make content that is viral to get money ',
    image: game_dungeon,
    link: '/',
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
    <section id="projects" className="projects-section py-20 bg-gradient-to-b from-gray-200 to-gray-200 text-gray-900 dark:from-gray-900 dark:to-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Innovations at GMTStudio
          </span>
        </h2>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
          >
            {projects.slice(currentSlide * (isMobile ? 1 : 3), currentSlide * (isMobile ? 1 : 3) + (isMobile ? 1 : 3)).map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-gray-800 p-1 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => handleProjectClick(project.link, project.isInternal)}
                role="button"
                aria-label={`View project ${project.title}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.link, project.isInternal)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-75 transition-opacity duration-500 group-hover:opacity-100`}></div>
                <div className="relative p-6 sm:p-8">
                  <div className="overflow-hidden rounded-xl shadow-xl transition duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-48 w-full object-cover object-center transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                    />
                  </div>
                  <div className="relative mt-6">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                      <FontAwesomeIcon icon={project.icon} className="mr-2 text-2xl" />
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <motion.button 
                      className="flex items-center justify-center w-full bg-white text-gray-900 font-semibold px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">Explore</span>
                      <FontAwesomeIcon icon={faBolt} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OurProjects;
