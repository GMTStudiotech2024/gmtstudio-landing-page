import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaChevronRight, FaRocket, FaCodeBranch, FaMap, FaSearch, FaUsers, FaChartLine, FaMicrochip, FaCloud, FaDna, FaGlobeAmericas } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ResearchCard = ({
  title,
  description,
  Icon,
  publications,
  collaborators,
}: {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className: string }>;
  publications: string[];
  collaborators: string[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
      whileHover={{ y: shouldReduceMotion ? 0 : -5 }}
      layout
    >
      <div className="p-6">
        <Icon className="text-5xl text-indigo-600 dark:text-indigo-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <motion.button
          className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold"
          onClick={toggleExpand}
          whileHover={{ x: shouldReduceMotion ? 0 : 5 }}
        >
          {isExpanded ? "Show Less" : "Learn More"} <FaChevronRight className="ml-2" />
        </motion.button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="px-6 pb-6"
          >
            <h4 className="font-semibold mb-2">Recent Publications:</h4>
            <ul className="list-disc pl-5 mb-4">
              {publications.map((pub, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">{pub}</li>
              ))}
            </ul>
            <h4 className="font-semibold mb-2">Key Collaborators:</h4>
            <ul className="list-disc pl-5">
              {collaborators.map((collab, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">{collab}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ResearchProcess = ({ icon: Icon, title, description }: { icon: React.ComponentType<{ className: string }>, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center w-48">
    <Icon className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
    <h3 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{value}</h3>
    <p className="text-gray-700 dark:text-gray-300">{label}</p>
  </div>
);

const fundingData = [
  { year: 2021, amount: 0 },
  { year: 2022, amount: 0 },
  { year: 2023, amount: 1 },
  { year: 2024, amount: 3 },
  { year: 2025, amount: 5 },
];

const FundingChart = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <h3 className="text-2xl font-bold mb-4 text-center">GMTStudio Product Growth</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={fundingData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Research = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const researchAreas = [
    {
      title: "GMTStudio Landing page ",
      description: "We choose to use React JS becuase it is harder but better than HTML for developing web applications",
      Icon: FaRocket,
      publications: [
        "Our project launch pad",
        "introduce ourself",
        "enhance your experience"
      ],
      collaborators: [
        "GMTStudio AI Studio",
        "Every AI on Earth, to enhance our Code",
        "Vercel"
      ],
      category: 'Web Development'
    },
    {
      title: "GMTStudio AI studio",
      description: "We try to use Current popular AI to Create an AI, helping us to develop a new type of Model",
      Icon: FaCodeBranch,
      publications: [
        "Enhance the AI by using AI",
        "Create the nearly stupid but very stupid AI",
        "Vercel"
      ],
      collaborators: [
        "ChatGPT from OPENAI",
        "Claude 3.5 sonnet from Anthropic",
        "Mazs AI from GMTStudio"
      ],
      category: 'Web Application'
    },
    {
      title: "Theta - Social Media Platform",
      description: "A New type of experience of Social Media ",
      Icon: FaMap ,
      publications: [
        "Vercel",
        "AppWrite",
        "AI"
      ],
      collaborators: [
        "Artificial intelligence",
        "My hand",
        "User"
      ],
      category: 'Web Application'
    },
  ];

  const filteredResearchAreas = researchAreas.filter(area => 
    (activeTab === 'all' || area.category === activeTab) &&
    (area.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     area.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Company Info
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto">
            Exploring the frontiers of technology to shape the future and drive positive change in our interconnected world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition duration-200 shadow-md"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              Explore Our Work
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition duration-200 shadow-md"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              Join Our Team
            </motion.button>
          </div>
        </motion.div>

        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-wrap justify-center space-x-2 space-y-2">
            {['all', 'Web Development', 'Web Application',].map((tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search research areas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence>
            {filteredResearchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: index * 0.1 }}
              >
                <ResearchCard {...area} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
        >
<h2 className="text-3xl font-bold mb-6 text-center">Our Research Process</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: FaSearch, title: "New Project Idea", description: "We explore new ideas and challenges" },
              { icon: FaMicrochip, title: "DataBase Develop", description: "AppWrite is a great thing to use" },
              { icon: FaRocket, title: "New and Powerful", description: "We build new and power application" },
              { icon: FaUsers, title: "Collaborate", description: "If you want to, just Email us" },
            ].map((step, index) => (
              <ResearchProcess key={index} {...step} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Research Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <StatCard value="3" label="Published Application" />
            <StatCard value="6+" label="current Development" />
            <StatCard value="16+" label="Team member age" />
            <StatCard value="7" label="Team member count" />
          </div>
          <FundingChart />
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Join Our Team</h2>
          <p className="text-center mb-8">
            We're always looking for brilliant minds to join our team. 
            If you're passionate about pushing the boundaries of technology and making a real impact, we want to hear from you!
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition duration-200 shadow-md"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              View Open Positions
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition duration-200 shadow-md"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              Submit Your CV
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to work with us?</h2>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:from-indigo-700 hover:to-purple-700 transition duration-200 shadow-md"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Research;