import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <section id="contact" className="contact-section py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2 p-4">
            <form className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">Name</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg" type="text" id="name" placeholder="Your Name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">Email</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg" type="email" id="email" placeholder="Your Email" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="message">Message</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg" id="message" placeholder="Your Message"></textarea>
              </div>
              <div className="flex justify-center">
                <button className="btn btn-primary" type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
