import React from 'react';
import projectImage1 from '../assets/images/blog2.png';
import projectImage2 from '../assets/images/blog3.png';
import projectImage3 from '../assets/images/blog1.png';

const projects = [
  { title: 'Project One', description: 'Description of Project One', image: projectImage1 },
  { title: 'Project Two', description: 'Description of Project Two', image: projectImage2 },
  { title: 'Project Three', description: 'Description of Project Three', image: projectImage3 },
];

const OurProjects: React.FC = () => {
  return (
    <section id="projects" className="projects-section py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {projects.map((project, index) => (
            <div className="transform transition-transform hover:scale-105 duration-300 ease-in-out" key={index}>
              <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <img src={project.image} alt={project.title} className="rounded-t-lg w-full h-48 object-cover mb-4" />
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurProjects;
