import React from 'react';
import projectImage1 from '../assets/images/blog2.png'; // Add the appropriate path
import projectImage2 from '../assets/images/blog3.png'; // Add the appropriate path
import projectImage3 from '../assets/images/blog1.png'; // Add the appropriate path

const projects = [
  { title: 'Project One', description: 'Description of Project One', image: projectImage1 },
  { title: 'Project Two', description: 'Description of Project Two', image: projectImage2 },
  { title: 'Project Three', description: 'Description of Project Three', image: projectImage3 },
  // Add more projects as needed
];

const OurProjects: React.FC = () => {
  return (
    <section id="projects" className="projects-section py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Projects</h2>
        <div className="flex flex-wrap justify-center">
          {projects.map((project, index) => (
            <div className="w-full md:w-1/2 lg:w-1/3 p-4" data-aos="fade-up" data-aos-delay={`${index * 100}`} key={index}>
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
