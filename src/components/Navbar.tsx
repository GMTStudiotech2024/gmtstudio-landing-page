import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsProductsOpen(false);
    setIsProfileOpen(false);
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsProfileOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsProductsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600">
          GMTStudio
        </div>

        <div className="hidden lg:flex space-x-6 items-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/research" label="Research" />
          <DropdownMenu 
            label="Products"
            isOpen={isProductsOpen}
            toggleMenu={toggleProductsMenu}
            items={[
              { href: "https://gmt-studio-ai-workspace.vercel.app/", label: "GMTStudio AI WorkSpace" },
              { href: "https://theta-plum.vercel.app/", label: "Theta Social Media Platform" },
            ]}
          />
          <ProfileButton toggleProfileMenu={toggleProfileMenu} isProfileOpen={isProfileOpen} />
          <ThemeToggle />
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          <ProfileButton toggleProfileMenu={toggleProfileMenu} isProfileOpen={isProfileOpen} />
          <button onClick={toggleMenu} className="text-xl text-gray-900 dark:text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="lg:hidden mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 space-y-2"
          >
            <NavLink href="/" label="Home" />
            <NavLink href="/research" label="Research" />
            <DropdownMenu 
              label="Products"
              isOpen={isProductsOpen}
              toggleMenu={toggleProductsMenu}
              items={[
                { href: "https://gmt-studio-ai-workspace.vercel.app/", label: "GMTStudio AI WorkSpace" },
                { href: "https://theta-plum.vercel.app/", label: "Theta Social Media Platform" },
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileOverlay isProfileOpen={isProfileOpen} toggleProfileMenu={toggleProfileMenu} />
    </nav>
  );
}

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
    {label}
  </a>
);

const DropdownMenu: React.FC<{ label: string; isOpen: boolean; toggleMenu: () => void; items: { href: string; label: string }[] }> = ({ label, isOpen, toggleMenu, items }) => (
  <div className="relative">
    <button onClick={toggleMenu} className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
      {label} <FaChevronDown className="ml-1" />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
        >
          {items.map(item => (
            <ProductLink key={item.href} href={item.href} label={item.label} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ProductLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
    {label}
  </a>
);

const ProfileButton: React.FC<{ toggleProfileMenu: () => void; isProfileOpen: boolean }> = ({ toggleProfileMenu, isProfileOpen }) => (
  <button onClick={toggleProfileMenu} className="block p-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
    <FaUser className={`w-5 h-5 ${isProfileOpen ? 'text-blue-500 dark:text-yellow-400' : ''}`} />
  </button>
);

const ProfileOverlay: React.FC<{ isProfileOpen: boolean; toggleProfileMenu: () => void }> = ({ isProfileOpen, toggleProfileMenu }) => (
  <AnimatePresence>
    {isProfileOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h2>
            <button onClick={toggleProfileMenu} className="p-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <a href="/CEO" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-300">About Three CEO</a>

            <a href="/Learning " className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-300">Project Learning</a>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Navbar;
