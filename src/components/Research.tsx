import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaRocket, FaFlask, FaClock, FaRobot, FaLock, FaList, FaThLarge, FaExternalLinkAlt, FaFilter, FaSort, FaChevronDown } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

interface ResearchPaper {
  id: number;
  title: string;
  authors: string[];
  abstract: string;
  date: string;
  category: string;
  status: 'beta' | 'coming_soon' | 'live' | 'in_development' | 'concept';
  doi?: string;
  pdfLink?: string;
}

const Research: React.FC = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      // Replace this with actual API call
      const mockPapers: ResearchPaper[] = [
        {
          id: 1,
          title: "Advancements in AI WorkSpace: A Comprehensive Study",
          authors: ["John Doe, PhD", "Jane Smith, MSc"],
          abstract: "This paper explores recent breakthroughs in AI WorkSpace technology, focusing on improved natural language processing and adaptive learning algorithms. We present a novel framework for integrating these advancements into existing workplace environments.",
          date: "2023-06-15",
          category: "Artificial Intelligence",
          status: "live",
          doi: "10.1234/ai.2023.1234",
          pdfLink: "/papers/ai-workspace-advancements.pdf"
        },
        {
          id: 2,
          title: "Innovative Storytelling in Digital Platforms: The Story Vending Machine Paradigm",
          authors: ["Alice Johnson, PhD", "Bob Williams, MA"],
          abstract: "We present a novel approach to digital storytelling using our Story Vending Machine concept. This paper discusses the theoretical framework, implementation challenges, and potential applications in education and entertainment sectors.",
          date: "2023-05-22",
          category: "Digital Media",
          status: "beta",
          doi: "10.5678/dm.2023.5678",
          pdfLink: "/papers/story-vending-machine.pdf"
        },
        {
          id: 3,
          title: "Social Media Platform Architecture: A Case Study of Theta",
          authors: ["Charlie Brown, MSc", "Diana Prince, PhD"],
          abstract: "An in-depth analysis of the architecture behind the Theta social media platform. This paper examines the scalability, security, and user experience aspects of Theta's infrastructure, providing insights for future social media platform developments.",
          date: "2023-07-01",
          category: "Web Technologies",
          status: "live",
          doi: "10.9101/wt.2023.9101",
          pdfLink: "/papers/theta-architecture-study.pdf"
        },
      ];
      setPapers(mockPapers);
    };

    fetchPapers();
  }, []);

  const filteredPapers = papers
    .filter(paper => 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(paper => filter ? paper.category === filter : true)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'beta':
        return <FaFlask className="text-yellow-500" title="Beta" />;
      case 'coming_soon':
        return <FaClock className="text-blue-500" title="Coming Soon" />;
      case 'live':
        return <FaRocket className="text-green-500" title="Live" />;
      case 'in_development':
        return <FaRobot className="text-purple-500" title="In Development" />;
      case 'concept':
        return <FaLock className="text-gray-500" title="Concept" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Research Publications at <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">GMTStudio</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search papers by title, author, or keywords..."
              className="w-full p-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-700"
              data-tooltip-id="filter-tooltip"
              data-tooltip-content="Toggle Filters"
            >
              <FaFilter className="text-gray-600 dark:text-gray-300" />
            </button>
            <Tooltip id="filter-tooltip" />

            <button
              onClick={() => setSortBy(sortBy === 'date' ? 'title' : 'date')}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-700"
              data-tooltip-id="sort-tooltip"
              data-tooltip-content={`Sort by ${sortBy === 'date' ? 'Title' : 'Date'}`}
            >
              <FaSort className="text-gray-600 dark:text-gray-300" />
            </button>
            <Tooltip id="sort-tooltip" />

            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-700"
              title={isGridView ? "Switch to List View" : "Switch to Grid View"}
            >
              {isGridView ? <FaList className="text-gray-600 dark:text-gray-300" /> : <FaThLarge className="text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-4">
              <select
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Digital Media">Digital Media</option>
                <option value="Web Technologies">Web Technologies</option>
              </select>
              {/* Add more filters here if needed */}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8"}
          >
            {filteredPapers.map((paper) => (
              <motion.div
                key={paper.id}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedPaper(paper)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{paper.title}</h2>
                  {getStatusIcon(paper.status)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {paper.authors.join(', ')} • {new Date(paper.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{paper.abstract}</p>
                <div className="flex flex-wrap justify-between items-center">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full mb-2">
                    {paper.category}
                  </span>
                  {paper.doi && (
                    <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors text-sm mb-2">
                      DOI: {paper.doi}
                    </a>
                  )}
                  <div className="flex space-x-2">
                    {paper.pdfLink && (
                      <a href={paper.pdfLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-colors">
                        <FaExternalLinkAlt title="View PDF" />
                      </a>
                    )}
                    <button className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 transition-colors">
                      <FaExternalLinkAlt title="Read More" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPaper(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedPaper.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {selectedPaper.authors.join(', ')} • {new Date(selectedPaper.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedPaper.abstract}</p>
              <div className="flex justify-between items-center">
                <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-1 rounded-full">
                  {selectedPaper.category}
                </span>
                {selectedPaper.doi && (
                  <a href={`https://doi.org/${selectedPaper.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors">
                    DOI: {selectedPaper.doi}
                  </a>
                )}
              </div>
              {selectedPaper.pdfLink && (
                <a
                  href={selectedPaper.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                >
                  View Full Paper (PDF)
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Research;