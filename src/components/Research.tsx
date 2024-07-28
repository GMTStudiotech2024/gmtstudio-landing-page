import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaChevronRight, FaRocket, FaCodeBranch, FaMap, FaSearch, FaUsers, FaMicrochip } from 'react-icons/fa';
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
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border border-blue-500"
      whileHover={{ y: shouldReduceMotion ? 0 : -5 }}
      layout
    >
      <div className="p-6">
        <Icon className="text-6xl text-blue-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <motion.button
          className="flex items-center text-blue-400 font-semibold"
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
            <h4 className="font-semibold mb-2 text-blue-300">Recent Publications:</h4>
            <ul className="list-disc pl-5 mb-4">
              {publications.map((pub, index) => (
                <li key={index} className="text-sm text-gray-400">{pub}</li>
              ))}
            </ul>
            <h4 className="font-semibold mb-2 text-blue-300">Key Collaborators:</h4>
            <ul className="list-disc pl-5">
              {collaborators.map((collab, index) => (
                <li key={index} className="text-sm text-gray-400">{collab}</li>
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
    <Icon className="text-5xl text-blue-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-center border border-blue-500">
    <h3 className="text-5xl font-bold text-blue-400 mb-2">{value}</h3>
    <p className="text-gray-300">{label}</p>
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
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 border border-blue-500">
    <h3 className="text-2xl font-bold mb-4 text-center text-white">GMTStudio Product Growth</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={fundingData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
        <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
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
      title: "GMTStudio Landing Page",
      description: "We use React JS for developing web applications, providing a robust and scalable solution.",
      Icon: FaRocket,
      publications: [
        "Our project launch pad",
        "Introducing ourselves",
        "Enhancing user experience"
      ],
      collaborators: [
        "GMTStudio AI Studio",
        "Global AI Community",
        "Vercel"
      ],
      category: 'Web Development'
    },
    {
      title: "GMTStudio AI Studio",
      description: "Leveraging current AI technologies to develop innovative models and solutions.",
      Icon: FaCodeBranch,
      publications: [
        "Enhancing AI with AI",
        "Creating advanced AI models",
        "Vercel"
      ],
      collaborators: [
        "OpenAI's ChatGPT",
        "Anthropic's Claude 3.5",
        "GMTStudio's Mazs AI"
      ],
      category: 'AI Development'
    },
    {
      title: "Theta - Social Media Platform",
      description: "A revolutionary social media experience designed with cutting-edge technology.",
      Icon: FaMap,
      publications: [
        "Vercel",
        "AppWrite",
        "AI"
      ],
      collaborators: [
        "Artificial Intelligence",
        "Development Team",
        "User Community"
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
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Company Info
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl mb-10 max-w-3xl mx-auto text-gray-300">
            Pioneering the future of technology to create a better, more connected world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              className="px-8 py-4 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition duration-200 shadow-lg"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              Explore Our Work
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 transition duration-200 shadow-lg"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              Join Our Team
            </motion.button>
          </div>
        </motion.div>

        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-wrap justify-center space-x-2 space-y-2">
            {['all', 'Web Development', 'AI Development', 'Web Application'].map((tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-800 text-blue-400'}`}
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
            className="px-4 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
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
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 mb-16 border border-blue-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Our Research Process</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: FaSearch, title: "New Project Idea", description: "Exploring innovative ideas and challenges." },
              { icon: FaMicrochip, title: "Database Development", description: "Utilizing AppWrite for robust database solutions." },
              { icon: FaRocket, title: "Powerful Applications", description: "Building cutting-edge applications." },
              { icon: FaUsers, title: "Collaboration", description: "Join us in our mission to innovate." },
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
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Research Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <StatCard value="3" label="Published Applications" />
            <StatCard value="6+" label="Current Developments" />
            <StatCard value="16+" label="Team Member Age" />
            <StatCard value="7" label="Team Member Count" />
          </div>
          <FundingChart />
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 mb-16 border border-blue-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Join Our Team</h2>
          <p className="text-center mb-8 text-gray-300">
            We're always looking for brilliant minds to join our team. 
            If you're passionate about pushing the boundaries of technology and making a real impact, we want to hear from you!
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition duration-200 shadow-lg"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              View Open Positions
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 transition duration-200 shadow-md"
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
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition duration-200 shadow-md"
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