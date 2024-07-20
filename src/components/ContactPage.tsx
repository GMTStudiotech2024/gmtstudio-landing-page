import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaUser, FaComments } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  submitted: boolean;
  success: boolean;
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
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>({ submitted: false, success: false, message: '' });
  const [activeSection, setActiveSection] = useState<'form' | 'faq'>('form');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Here, you would typically send the form data to your backend
    // For demonstration, we'll simulate an API call
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If the API call is successful, update the form status
      setFormStatus({
        submitted: true,
        success: true,
        message: "Your message has been sent successfully. We'll get back to you soon!"
      });
      
      // Clear the form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      // If there's an error, update the form status accordingly
      setFormStatus({
        submitted: true,
        success: false,
        message: "There was an error sending your message. Please try again later."
      });
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

  const faqItems = [
    { question: "What services do you offer?", answer: "We offer a wide range of tech services including web development, mobile app development, and cloud solutions." },
    { question: "How can I request a quote?", answer: "You can request a quote by filling out our contact form or sending us an email directly." },
    { question: "What is your typical response time?", answer: "We strive to respond to all inquiries within 24-48 hours during business days." },
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">Get in Touch</h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          We're excited to hear from you! Choose how you'd like to connect with us.
        </p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('form')}
            className={`px-4 py-2 rounded-md ${activeSection === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Contact Form
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-4 py-2 rounded-md ${activeSection === 'faq' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            FAQ
          </button>
        </div>

        {activeSection === 'form' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-transform duration-300 hover:scale-105">
                  <item.icon className="text-4xl text-blue-500 dark:text-yellow-400 mb-2" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                </div>
              ))}
            </div>

            {formStatus.submitted && (
              <div className={`p-4 mb-4 text-sm rounded-lg ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} role="alert">
                <span className="font-medium">{formStatus.success ? 'Success!' : 'Error!'}</span> {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-gray-800 dark:text-gray-200 mb-1">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      required
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-800 dark:text-gray-200 mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      required
                    />
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="subject" className="text-gray-800 dark:text-gray-200 mb-1">Subject</label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                  <FaComments className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-gray-800 dark:text-gray-200 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 dark:bg-yellow-400 text-white dark:text-gray-800 rounded-md font-bold hover:bg-blue-600 dark:hover:bg-yellow-500 transition-colors duration-300 flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Frequently Asked Questions</h2>
            {faqItems.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300"
            >
              <link.icon className="text-2xl" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;