import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaChevronDown, FaHome, FaFlask, FaBox, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { account } from '../appwriteConfig'; // Assuming this is your Appwrite account configuration

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get(); // Fetch user data from Appwrite
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
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

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Logout the user
      setUser(null);
      alert('Logged out successfully');
    } catch (error) {
      console.error('Failed to log out:', error);
      alert('An error occurred during logout');
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-slate-700/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600"
        >
          GMTStudio
        </motion.div>

        <div className="hidden lg:flex space-x-6 items-center text-white dark:text-gray-200">
          <NavLink href="/" label="Home" icon={<FaHome />} />
          <NavLink href="/research" label="Research" icon={<FaFlask />} />
          <DropdownMenu 
            label="Products"
            icon={<FaBox />}
            isOpen={isProductsOpen}
            toggleMenu={toggleProductsMenu}
            items={[
              { href: "https://gmt-studio-ai-workspace.vercel.app/", label: "GMTStudio AI WorkSpace", icon: <FaBox /> },
              { href: "https://theta-plum.vercel.app/", label: "Theta Social Media Platform", icon: <FaBox /> },
            ]}
          />
          <NavLink href="/contact" label="Contact" icon={<FaEnvelope />} />
          <ProfileButton toggleProfileMenu={toggleProfileMenu} isProfileOpen={isProfileOpen} user={user} />
          <ThemeToggle />
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          <ProfileButton toggleProfileMenu={toggleProfileMenu} isProfileOpen={isProfileOpen} user={user} />
          <button onClick={toggleMenu} className="text-xl text-white dark:text-white">
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
            <NavLink href="/" label="Home" icon={<FaHome />} />
            <NavLink href="/research" label="Research" icon={<FaFlask />} />
            <DropdownMenu 
              label="Products"
              icon={<FaBox />}
              isOpen={isProductsOpen}
              toggleMenu={toggleProductsMenu}
              items={[
                { href: "https://gmt-studio-ai-workspace.vercel.app/", label: "GMTStudio AI WorkSpace", icon: <FaBox /> },
                { href: "https://theta-plum.vercel.app/", label: "Theta Social Media Platform", icon: <FaBox /> },
              ]}
            />
            <NavLink href="/contact" label="Contact" icon={<FaEnvelope />} />
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileDropdown isProfileOpen={isProfileOpen} toggleProfileMenu={toggleProfileMenu} handleLogout={handleLogout} user={user} />
    </nav>
  );
};

const NavLink: React.FC<{ href: string; label: string; icon: React.ReactNode }> = ({ href, label, icon }) => (
  <a href={href} className="block px-3 py-2 text-blue-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300 flex items-center">
    {icon} <span className="ml-2">{label}</span>
  </a>
);

const DropdownMenu: React.FC<{ label: string; icon: React.ReactNode; isOpen: boolean; toggleMenu: () => void; items: { href: string; label: string; icon: React.ReactNode }[] }> = ({ label, icon, isOpen, toggleMenu, items }) => (
  <div className="relative">
    <button onClick={toggleMenu} className="flex items-center px-3 py-2 text-blue-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
      {icon} <span className="ml-2">{label}</span> <FaChevronDown className="ml-1" />
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
          className="absolute left-0 mt-2 w-56 bg-gray-200 dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
        >
          {items.map(item => (
            <ProductLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ProductLink: React.FC<{ href: string; label: string; icon: React.ReactNode }> = ({ href, label, icon }) => (
  <a href={href} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center">
    {icon} <span className="ml-2">{label}</span>
  </a>
);

const ProfileButton: React.FC<{ toggleProfileMenu: () => void; isProfileOpen: boolean; user: any }> = ({ toggleProfileMenu, isProfileOpen, user }) => (
  <button onClick={toggleProfileMenu} className="block p-2 text-white dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300 relative">
    {user && user.image ? (
      <img
        src={user.image}
        alt="User"
        className="w-8 h-8 rounded-full border-2 border-transparent hover:border-blue-500 dark:hover:border-yellow-400"
      />
    ) : (
      <FaUser className={`w-5 h-5 ${isProfileOpen ? 'text-blue-500 dark:text-yellow-400' : ''}`} />
    )}
  </button>
);

const ProfileDropdown: React.FC<{ isProfileOpen: boolean; toggleProfileMenu: () => void; handleLogout: () => void; user: any }> = ({ isProfileOpen, toggleProfileMenu, handleLogout, user }) => (
  <AnimatePresence>
    {isProfileOpen && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="absolute right-4 mt-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 space-y-2"
      >
        <a href="/Latest" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center">
          <FaUser className="mr-2" /> Latest Update
        </a>
        <a href="/Learning" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center">
          <FaUser className="mr-2" /> Project Learning
        </a>
        <a href="/SignUp" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center">
          <FaUser className="mr-2" /> SignUp / Login
        </a>
        {user && (
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-300 flex items-center">
            <FaUser className="mr-2" /> Logout
          </button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default Navbar;
