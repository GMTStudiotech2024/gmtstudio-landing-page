import React, { useState,  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  FaChevronDown,  FaProjectDiagram, FaRocket, FaRobot, FaDatabase, FaBug, FaExclamationTriangle, FaCode, FaPaintBrush, FaGlobe, FaAtom, FaBrain, FaComments, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ThemeToggle from '../services/ThemeToggle';
import { 
  TbUserHexagon, 
  TbHomeSignal,
  TbNews,
  TbBooks,
  TbLogin,
  TbInfoTriangle,
  TbCode,
  TbCodeAsterisk,
  TbDeviceDesktopAnalytics,

   } from "react-icons/tb";
import { Tooltip } from 'react-tooltip';

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '', isOpen, onToggle }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const sidebarVariants = {
    open: { width: '18rem', transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { width: '4rem', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const listVariants = {
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const links = [
    { to: '/', icon: TbHomeSignal, label: 'Home' },
    { label: "Latest News", 
      icon: TbNews,
      subItems: [
        { to: '/news1', label: 'New Project in Queue', icon: FaProjectDiagram },
        { to: '/news2', label: 'Launch Social Media Platform', icon: FaRocket },
        { to: '/news3', label: 'Launch GMTStudio AI Workspace', icon: FaRobot },
        { to: '/news4', label: 'Enhance Database of AI', icon: FaDatabase },
        { to: '/news5', label: 'New Project in Queue', icon: FaProjectDiagram },
        { to: '/news6', label: 'Bug Fixed: Theta Social Media Application', icon: FaBug },
        { to: '/news7', label: 'Important Notice: Recent Database Issue and Our Response', icon: FaExclamationTriangle },
        { to: '/news8', label: 'Exciting Progress in Front-end Development', icon: FaCode },
        { to: '/news9', label: "Revolutionizing AI Workspace: GMTStudio's UI Overhaul", icon: FaPaintBrush },
        { to: '/news10', label: "GMTStudio's Official website Update", icon: FaGlobe },
        { to: '/news11', label: 'GMTStudio Beta Release', icon: FaAtom},
        { to: '/news12', label: 'Mazs AI: A Technical Deep Dive into a Neural Network-Powered Chatbot', icon: FaBrain },
        { to: '/news13', label: 'GMTStudio MazsAI v1.0: A Comprehensive Approach to Conversational AI', icon: FaComments },
        { to: '/news14', label: 'Bring Mazs AI into our official website', icon: FaComments },
        { to: '/news15', label: 'Mazs AI v1.0 Anatra update', icon: FaComments },
        { to: '/news16', label: 'Mazs AI v1.1.0 update', icon: FaComments },
        { to: '/news17', label: 'Mazs AI v1.2.0 update', icon: FaComments },
        { to: '/news18', label: 'Mazs AI v1.3.5 update', icon: FaComments },
      ],
    },
    {label: 'Mazs AI Projects', icon: TbCode, 
      subItems: [
        {to: '/website-builder', label: 'Mazs AI Website Builder', icon: FaCode},
        {to: '/advanced-search', label: 'Mazs AI Search', icon: TbCode},
        {to: '/mazsai', label: 'Mazs AI Lab', icon: TbCodeAsterisk},
      ],
    },
    { label: 'Learning', icon: TbBooks, to: '/Learning' },
    { label: 'Systems Status', icon: TbDeviceDesktopAnalytics, to: '/system-status' },
    { to: '/SignUp', icon: TbLogin, label: 'Sign Up' },
    { to: '/help', icon: TbInfoTriangle, label: 'Help' },
 ];

  const filteredLinks = links.filter(link => 
    link.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (link.subItems && link.subItems.some(subItem => 
      subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  if (location.pathname === '/') return null;

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-black text-gray-800 dark:text-white p-4 z-40 overflow-y-auto transition-all duration-300 ease-in-out pt-20 ${isOpen ? 'w-72' : 'w-16'} ${className} shadow-lg`}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      {isOpen && (
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white flex items-center">
            <TbUserHexagon className="mr-2 text-blue-500" />
            Hello, User
          </h2>
          <ThemeToggle />
        </motion.div>
      )}
      {isOpen && (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </motion.div>
      )}
      <nav>
        <AnimatePresence>
          <motion.ul
            className="space-y-2"
            variants={listVariants}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
          >
            {filteredLinks.map((link, index) => (
              <motion.li 
                key={link.label}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                {link.subItems ? (
                  <div>
                    <motion.button
                      onClick={() => toggleDropdown(link.label)}
                      aria-expanded={openDropdown === link.label}
                      aria-controls={`submenu-${link.label}`}
                      className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${openDropdown === link.label ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-tooltip-id={`tooltip-${link.label}`}
                      data-tooltip-content={isOpen ? '' : link.label}
                    >
                      <span className="flex items-center">
                        <link.icon className={`${!isOpen ? 'text-xl mx-auto' : 'mr-3'} text-blue-500`} />
                        {isOpen && <span className="font-medium">{link.label}</span>}
                      </span>
                      {isOpen && (
                        <motion.div
                          initial={false}
                          animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown className="text-gray-600 dark:text-gray-400" />
                        </motion.div>
                      )}
                    </motion.button>
                    {!isOpen && <Tooltip id={`tooltip-${link.label}`} place="right" />}
                    <AnimatePresence>
                      {openDropdown === link.label && isOpen && (
                        <motion.ul 
                          id={`submenu-${link.label}`}
                          role="menu"
                          className="ml-6 mt-1 space-y-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {link.subItems.map((subItem) => (
                            <motion.li 
                              key={subItem.to}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                to={subItem.to}
                                className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                                  location.pathname === subItem.to
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <subItem.icon className="mr-3 text-sm" />
                                <span className="text-sm">{subItem.label}</span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === link.to
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                    data-tooltip-id={`tooltip-${link.label}`}
                    data-tooltip-content={isOpen ? '' : link.label}
                  >
                    <link.icon className={`${!isOpen ? 'text-xl mx-auto' : 'mr-3'} ${location.pathname === link.to ? 'text-white' : 'text-blue-500'}`} />
                    {isOpen && <span className="font-medium">{link.label}</span>}
                  </Link>
                )}
                {!isOpen && <Tooltip id={`tooltip-${link.label}`} place="right" />}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </nav>
      <motion.button
        onClick={onToggle}
        className="absolute bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;