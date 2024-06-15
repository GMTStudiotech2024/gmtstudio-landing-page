import React from 'react';
import projectImage1 from '../assets/images/blog2.png';
import projectImage2 from '../assets/images/blog1.png';
import projectImage3 from '../assets/images/blog3.png';

const projects = [
  { title: 'GMTStudio Landing Page', description: 'GMTStudio design their own Landing Page by using React JS with TailwindCSS', image: projectImage1 },
  { title: 'Theta Social Media Platform', description: 'By using Appwrite and Vite, we are able to design the second greatest Social Media of all time', image: projectImage2 },
  { title: 'well I do not know what is this ', description: 'My boss did not tell me about this', image: projectImage3 },
];

const OurProjects: React.FC = () => {
  return (
    <section id="projects" className="projects-section py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 "><span className="bg-gradient-to-r from-sky-400 via-violet-600 to-lime-300 bg-clip-text text-transparent">What's New At GMTStudio</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 " data-aos="fade-up">
          {projects.map((project, index) => (
            <div className="transform transition-transform hover:scale-105 duration-300 ease-in-out" key={index}>
              <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg ">
                <img src={project.image} alt={project.title} className="rounded-t-lg w-full h-48 object-cover mb-4" />
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 ">{project.title}</h3>
                <p className="bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurProjects;
