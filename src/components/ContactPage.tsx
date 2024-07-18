import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    setFormSubmitted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">Contact Us</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          We'd love to hear from you! Fill out the form below or reach us at our contact points.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center justify-center flex-col text-center">
            <FaEnvelope className="text-4xl text-blue-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">contact@example.com</p>
          </div>
          <div className="flex items-center justify-center flex-col text-center">
            <FaPhone className="text-4xl text-blue-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300">+123 456 7890</p>
          </div>
          <div className="flex items-center justify-center flex-col text-center">
            <FaMapMarkerAlt className="text-4xl text-blue-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">Address</h3>
            <p className="text-gray-600 dark:text-gray-300">123 Main Street, City, Country</p>
          </div>
        </div>

        {formSubmitted ? (
          <div className="text-center text-green-500 font-bold">
            Thank you for reaching out! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-800 dark:text-gray-200">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-800 dark:text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-800 dark:text-gray-200">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 dark:bg-yellow-400 text-white dark:text-gray-800 rounded-md font-bold hover:bg-blue-600 dark:hover:bg-yellow-500 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ContactPage;
