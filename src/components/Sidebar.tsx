import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaNewspaper, FaFlask, FaGraduationCap, FaEnvelope, FaSignInAlt, FaInfoCircle, FaChevronDown, FaChevronUp, FaProjectDiagram, FaRocket, FaRobot, FaDatabase, FaBug, FaExclamationTriangle, FaCode, FaPaintBrush, FaGlobe, FaAtom, FaBrain, FaComments, FaBars, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };


  const links = [
    { to: '/', icon: FaHome, label: 'Home' },
    { label: "Latest News", 
      icon: FaNewspaper,
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
      ],
    },
    { label: 'Research', icon: FaFlask, to: '/Research' },
    { label: 'Learning', icon: FaGraduationCap, to: '/Learning' },
    { label: 'Systems Status', icon: FaBars, to: '/system-status' },
    { to: '/contact', icon: FaEnvelope, label: 'Contact' },
    { to: '/SignUp', icon: FaSignInAlt, label: 'Sign Up' },
    { to: '/help', icon: FaInfoCircle, label: 'Help' },
  ];

  const filteredLinks = links.filter(link => 
    link.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (link.subItems && link.subItems.some(subItem => 
      subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  if (location.pathname === '/') return null;

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white p-4 z-40 overflow-y-auto transition-all duration-300 ease-in-out pt-20 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      <div className="flex justify-between items-center mb-6">
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600">
            Hello ! User 
          </h2>
        )}
      </div>
      {!isCollapsed && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <nav>
        <ul className="space-y-2">
          {filteredLinks.map((link) => (
            <li key={link.label}>
              {link.subItems ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 ${openDropdown === link.label ? 'bg-gray-800' : ''}`}
                  >
                    <span className="flex items-center">
                      <link.icon className={`${isCollapsed ? 'text-2xl mx-auto' : 'mr-3'}`} />
                      {!isCollapsed && link.label}
                    </span>
                    {!isCollapsed && (openDropdown === link.label ? <FaChevronUp /> : <FaChevronDown />)}
                  </button>
                  {openDropdown === link.label && !isCollapsed && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {link.subItems.map((subItem) => (
                        <li key={subItem.to}>
                          <Link
                            to={subItem.to}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                              location.pathname === subItem.to
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-800'
                            }`}
                          >
                            <subItem.icon className="mr-3" />
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={link.to}
                  className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <link.icon className={`${isCollapsed ? 'text-2xl mx-auto' : 'mr-3'}`} />
                  {!isCollapsed && link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;