import React from 'react';

const posts = [
  { title: 'Blog Post One', summary: 'Summary of blog post one.' },
  { title: 'Blog Post Two', summary: 'Summary of blog post two.' },
  { title: 'Blog Post Three', summary: 'Summary of blog post three.' },
  // Add more blog posts as needed
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="blog-section py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Blog</h2>
        <div className="flex flex-wrap justify-center">
          {posts.map((post, index) => (
            <div className="w-full md:w-1/2 lg:w-1/3 p-4" data-aos="fade-up" data-aos-delay={`${index * 100}`} key={index}>
              <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p>{post.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
