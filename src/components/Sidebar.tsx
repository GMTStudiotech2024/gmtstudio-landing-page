import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaNewspaper, FaFlask, FaGraduationCap, FaEnvelope, FaSignInAlt, FaInfoCircle, FaChevronDown, FaChevronUp, FaProjectDiagram, FaRocket, FaRobot, FaDatabase, FaBug, FaExclamationTriangle, FaCode, FaPaintBrush, FaGlobe, FaAtom, FaBrain, FaComments, FaBars } from 'react-icons/fa';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const links = [
    { to: '/', icon: FaHome, label: 'Home' },
    { label:"Latest News", 
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
        ],
    },
    {
      label: 'Research',
      icon: FaFlask,
      to: '/Research',
    },
    {
      label: 'Learning',
      icon: FaGraduationCap,
      to: '/Learning',
    },
    {
      label: 'Systems Status',
      icon: FaBars,
      to: '/system-status',
    },
    { to: '/contact', icon: FaEnvelope, label: 'Contact' },
    { to: '/SignUp', icon: FaSignInAlt, label: 'Sign Up' },
    { to: '/help', icon: FaInfoCircle, label: 'Help' },
  ];

  if (location.pathname === '/') return null;

  return (
    <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 z-40 overflow-y-auto transition-transform duration-300 ease-in-out transform lg:translate-x-0 -translate-x-full ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600">GMTStudio</h2>
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.label}>
              {link.subItems ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors duration-200 hover:bg-gray-800`}
                  >
                    <span className="flex items-center">
                      <link.icon className="mr-3" />
                      {link.label}
                    </span>
                    {openDropdown === link.label ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {openDropdown === link.label && (
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
                  <link.icon className="mr-3" />
                  {link.label}
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