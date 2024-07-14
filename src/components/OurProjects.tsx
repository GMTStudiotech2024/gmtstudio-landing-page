import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLinkAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import projectImage1 from '../assets/images/MazsAiPic.png';
import projectImage2 from '../assets/images/blog5.png';
import projectImage3 from '../assets/images/Story.jpg';

const projects = [
  {
    title: 'GMTStudio Story Vending Machine',
    description: 'New Ideas in GMTStudio',
    image: projectImage3,
    link: '/BlogPage3',
    icon: faExclamationCircle,
    isInternal: true,
  },
  {
    title: 'GMTStudio AI WorkSpace',
    description: 'GMTStudio designed their own AI, MAZS AI. Although it is still in development, you can use it!',
    image: projectImage1,
    link: 'https://gmt-studio-ai-workspace.vercel.app/',
    icon: faExternalLinkAlt,
    isInternal: false,
  },
  {
    title: 'Theta Social Media Platform',
    description: 'Using Appwrite and Vite, we designed one of the greatest social media platforms of all time.',
    image: projectImage2,
    link: 'https://theta-plum.vercel.app/',
    icon: faExternalLinkAlt,
    isInternal: false,
  },
];

const OurProjects: React.FC = () => {
  const navigate = useNavigate();

  const handleProjectClick = (link: string, isInternal: boolean) => {
    if (isInternal) {
      navigate(link);
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="projects-section py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white background-custom">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-sky-400 via-violet-600 to-lime-300 bg-clip-text text-transparent">
            What's New At GMTStudio
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative max-w-2xl rounded-3xl border border-gray-800 bg-gray-800 p-6 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-900 dark:shadow-none sm:p-8 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              onClick={() => handleProjectClick(project.link, project.isInternal)}
              role="button"
              aria-label={`View project ${project.title}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.link, project.isInternal)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl shadow-rose-600/40 transition duration-500 group-hover:scale-105 group-hover:shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-72 w-full object-cover object-top transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
              </div>
              <div className="relative mt-6">
                <h3 className="text-2xl font-semibold text-gray-300 dark:text-gray-300 mb-4 flex items-center">
                  <FontAwesomeIcon icon={project.icon} className="mr-2" />
                  {project.title}
                </h3>
                <p className="mt-4 mb-8 text-gray-300 dark:text-gray-300">
                  {project.description}
                </p>
                <button
                  className="flex items-center text-blue-500 dark:text-green-500 border border-blue-500 dark:border-green-500 px-4 py-2 rounded hover:bg-blue-500 dark:hover:bg-green-500 hover:text-white transition-colors duration-300 dark:hover:text-white"
                >
                  View Project
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
