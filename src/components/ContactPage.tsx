import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaUser,  } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactInfo {
  icon: IconType;
  title: string;
  content: string;
}

interface SocialLink {
  icon: IconType;
  url: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage("Thank you for your message. We'll get back to you soon!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    { icon: FaEnvelope, title: 'Email', content: 'GMTStudiotech@gmail.com' },
    { icon: FaPhone, title: 'Phone', content: '+123 456 7890' },
    { icon: FaMapMarkerAlt, title: 'Address', content: '123 Tech Street, Digital City, Webland' },
  ];

  const socialLinks: SocialLink[] = [
    { icon: FaGithub, url: 'https://github.com/GMTStudiotech' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/company/gmtstudiotech' },
    { icon: FaTwitter, url: 'https://twitter.com/GMTStudiotech' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200">Get in Touch</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            We're excited to hear from you! Reach out to us using the form below.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                <item.icon className="text-4xl text-blue-500 dark:text-yellow-400 mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              </div>
            ))}
          </div>

          {submitMessage && (
            <div className={`p-4 mb-4 text-sm rounded-lg ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} role="alert">
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-800 dark:text-gray-200 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-800 dark:text-gray-200 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-800 dark:text-gray-200 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-blue-500 dark:bg-yellow-400 text-white dark:text-gray-800 rounded-lg font-bold hover:bg-blue-600 dark:hover:bg-yellow-500 transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="flex justify-center space-x-6 mt-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300"
              >
                <link.icon className="text-3xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;