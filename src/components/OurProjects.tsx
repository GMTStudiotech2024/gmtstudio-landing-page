import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faExclamationCircle, faGlobe, faRocket, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import projectImage1 from '../assets/images/MazsAiPic.png';
import projectImage2 from '../assets/images/blog5.png';
import projectImage3 from '../assets/images/Story.jpg';
import {  TooltipWrapper } from 'react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';

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
    link: '/BlogPage3',
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
];

const OurProjects: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleProjectClick = (link: string, isInternal: boolean) => {
    if (isInternal) {
      navigate(link);
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || project.category === selectedCategory)
  );

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];

  return (
    <section id="projects" className="projects-section py-20 bg-gradient-to-b from-gray-200 to-gray-200 text-gray-900 dark:from-gray-900 dark:to-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Innovations at GMTStudio
          </span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TooltipWrapper
                  tooltipId={`tooltip-${index}`}
                  place="top"
                  content={project.description}
                >
                  <div
                    className="group relative overflow-hidden rounded-3xl bg-gray-800 p-1 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer"
                    onClick={() => handleProjectClick(project.link, project.isInternal)}
                    role="button"
                    aria-label={`View project ${project.title}`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.link, project.isInternal)}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-75 transition-opacity duration-500 group-hover:opacity-100`}></div>
                    <div className="relative p-6 sm:p-8">
                      <div className="overflow-hidden rounded-xl shadow-xl transition duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-72 w-full object-cover object-top transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                        />
                      </div>
                      <div className="relative mt-6">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                          <FontAwesomeIcon icon={project.icon} className="mr-3 text-3xl" />
                          {project.title}
                        </h3>
                        <p className="mt-4 mb-8 text-gray-300">
                          {project.description}
                        </p>
                        <motion.button 
                          className="flex items-center justify-center w-full bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-2">Explore Project</span>
                          <FontAwesomeIcon icon={faBolt} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </div>
                    {hoveredProject === index && (
                      <motion.div 
                        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {project.category}
                      </motion.div>
                    )}
                  </div>
                </TooltipWrapper>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OurProjects;
