import React from 'react';
import projectImage1 from '../assets/images/blog4.png';
import projectImage2 from '../assets/images/blog5.png';
import projectImage3 from '../assets/images/blog3.png';

const projects = [
  { 
    title: 'GMTStudio AI workSpace', 
    description: 'GMTStudio design their own AI, MAZS AI, although this is still in develop, but you can use it !', 
    image: projectImage1,
    link: 'https://gmt-studio-ai-workspace.vercel.app/' 
  },
  { 
    title: 'Theta Social Media Platform', 
    description: 'By using Appwrite and Vite, we are able to design the second greatest Social Media of all time', 
    image: projectImage2,
    link: 'https://theta-plum.vercel.app/' 
  },
  { 
    title: 'Well, I do not know what this is', 
    description: 'My boss did not tell me about this', 
    image: projectImage3,
    link: 'https://unknown-project.example.com' 
  },
];

const OurProjects: React.FC = () => {
  return (
    <section id="projects" className="projects-section py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-sky-400 via-violet-600 to-lime-300 bg-clip-text text-transparent">
            What's New At GMTStudio
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {projects.map((project, index) => (
            <div 
              className="group max-w-2xl rounded-3xl border border-gray-100 bg-gray-200 p-6 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-900 dark:shadow-none sm:p-8 transform transition-transform hover:scale-105 duration-300 ease-in-out" 
              key={index}
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl shadow-rose-600/40 transition duration-500 group-hover:scale-105 group-hover:shadow-md">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy" 
                  className="h-72 w-full object-cover object-top" 
                />
              </div>
              <div className="relative mt-6">
                <h3 className="text-2xl font-semibold text-rose-800 dark:text-rose-300 mb-4">
                  {project.title}
                </h3>
                <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300 bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent">
                  {project.description}
                </p>
                <button
                  onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                  className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white dark:border-green-500 dark:hover:bg-green-500 dark:text-green-500 dark:hover:text-white"
                >
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurProjects;
