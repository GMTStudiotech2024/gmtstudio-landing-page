import React from 'react';
import blogImage1 from '../assets/images/blog4.png';
import blogImage2 from '../assets/images/blog2.png';
import blogImage3 from '../assets/images/Story.jpg';

const blogPosts = [
  { 
    image: blogImage3, 
    title: "Story Vending Machine", 
    excerpt: "New project idea from GMTStudio ", 
    author: "Alston Chang", 
    date: "July 1, 2024",
    link: "/BlogPage3"
  },
  { 
    image: blogImage1, 
    title: "MAZS AI", 
    excerpt: "GMTStudio Ai workspace provides the service of Artificial Intelligence.", 
    author: "Alston Chang ",
    date: "June 17, 2024",
    link: "/BlogPage1"
  },
  { 
    image: blogImage2, 
    title: "Theta Social Media Application", 
    excerpt: "The newly designed website application, which was recently updated.", 
    author: "Lucus Yeh", 
    date: "May 25, 2024",
    link: "/BlogPage2"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-16 bg-black dark:bg-gray-800 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center animated-gradient-a">
          Our Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" data-aos="zoom-out-up">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="relative flex w-full lg:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md dark:bg-gray-900"
            >
              <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h5 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white antialiased">
                  {post.title}
                </h5>
                <p className="block font-sans text-lg font-light leading-relaxed text-gray-700 dark:text-gray-300 antialiased">
                  By {post.author} on {post.date}
                </p>
                <p className="block font-sans text-lg font-light leading-relaxed text-inherit antialiased text-gray-800 dark:text-white ">
                  {post.excerpt}
                </p>
              </div>
              <div className="p-8 pt-0">
                <a 
                  href={post.link}
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-base font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
