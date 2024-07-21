import React, { useState } from 'react';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
}

const blogs: Blog[] = [
  { id: 1, title: 'GMTStudio AI workspace', excerpt: 'New UI design for GMTStudio AI Workspace', date: '2024-07-19', author: 'Alston Chang', category: 'Artificial Intelligence', readTime: 8 },
  { id: 2, title: 'Story Vending Machine', excerpt: 'New project idea from GMTStudio', date: '2024-07-01', author: 'Lucus Yeh', category: 'Design', readTime: 6 },
  { id: 3, title: 'Theta Social Media Application', excerpt: 'The newly designed website application, which was recently updated.', date: '2024-05-17', author: 'Alston Chang', category: 'Social Media', readTime: 5 },
];

const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog.category === selectedCategory)
    : blogs;

  const categories = Array.from(new Set(blogs.map(blog => blog.category)));

  return (
    <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white mt-6 md:mt-10">Our Blog</h1>
      
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        <button
          className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mt-15 md:mt-15 py-16">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="relative flex flex-col rounded-xl bg-white dark:bg-gray-700 bg-clip-border text-gray-700 dark:text-white shadow-md py-9">
            <div className="relative mx-4 -mt-6 h-32 md:h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="flex items-center justify-center h-full">
                <span className="text-xl md:text-2xl font-bold">{blog.category}</span>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <h5 className="mb-2 block font-sans text-lg md:text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-blue-gray-200 antialiased">
                {blog.title}
              </h5>
              <p className="text-gray-600 dark:text-gray-200 mb-3 text-xs md:text-sm">
                By {blog.author} | {blog.date} | {blog.readTime} min read
              </p>
              <p className="block font-sans text-sm md:text-base font-light leading-relaxed text-inherit antialiased">
                {blog.excerpt}
              </p>
            </div>
            <div className="p-4 md:p-6 pt-0 mt-auto">
              <a
                href={`/blog/${blog.id}`}
                className="inline-block w-full select-none rounded-lg bg-blue-500 py-2 md:py-3 px-4 md:px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;