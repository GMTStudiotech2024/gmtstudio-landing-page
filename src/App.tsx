import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Hero from './components/Hero';
import Feature from './components/Feature';
import OurProjects from './components/OurProjects';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Error from './components/Error';
import Research from './components/Research';
import Learning from './components/Learning';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from '@vercel/analytics/react';
import './components/st.css';
import CustomCursor from './components/CustomCursor';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Sidebar from './components/Sidebar';
import Contact from './components/ContactPage';
import SignUp from './components/SignUp';
import Latest from './components/Latest';
import NEWS1 from './components/News/NEWS1';
import NEWS2 from './components/News/NEWS2';
import NEWS3 from './components/News/NEWS3';
import NEWS4 from './components/News/NEWS4';
import NEWS5 from './components/News/NEWS5';
import NEWS6 from './components/News/NEWS6';
import NEWS7 from './components/News/NEWS7';
import NEWS8 from './components/News/NEWS8';
import NEWS9 from './components/News/NEWS9';
import NEWS10 from './components/News/NEWS10';
import NEWS11 from './components/News/NEWS11';
import NEWS12 from './components/News/News12';
import NEWS13 from './components/News/NEWS13';
import NEWS14 from './components/News/NEWS14';
import NEWS15 from './components/News/NEWS15';
import Products from './components/Products';
import Help from './components/Help';
import LaunchGMTStudio from './components/LaunchGMTStudio';
import SystemStatus from './components/SystemStatus';
import AdvancedSearch from './components/AdvancedSearch';
import Login from './components/Login';
import AIWebsiteGenerator from './components/AIWebsiteGenerator';
const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const isHomePage = location.pathname === '/';

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleSearch]);

  return (
    <div className="App bg-gray-900 min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar onSearchClick={toggleSearch} />
      {!isHomePage && (
        <Sidebar 
          className="hidden md:block" 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <main className={`flex-grow transition-all duration-300 ${!isHomePage ? (isSidebarOpen ? 'md:ml-72' : 'md:ml-16') : ''}`}>
        {isSearchOpen && <Search onClose={toggleSearch} />}
        <Routes>
          <Route path="/" element={
            <>
              <div ref={heroRef}>
                <Hero />
              </div>
              <LaunchGMTStudio />
              <Blog />
              <Feature />
              <OurProjects />
            </>
          } />
          <Route path="/website-builder" element={<AIWebsiteGenerator />} />
          <Route path="/news1" element={<NEWS1 />} />
          <Route path="/news2" element={<NEWS2 />} />
          <Route path="/news3" element={<NEWS3 />} />
          <Route path="/news4" element={<NEWS4 />} />
          <Route path="/news5" element={<NEWS5 />} />
          <Route path="/news6" element={<NEWS6 />} />
          <Route path="/news7" element={<NEWS7 />} />
          <Route path="/news8" element={<NEWS8 />} />
          <Route path="/news9" element={<NEWS9 />} />
          <Route path="/news10" element={<NEWS10 />} />
          <Route path="/news11" element={<NEWS11 />} />
          <Route path="/news12" element={<NEWS12 />} />
          <Route path="/news13" element={<NEWS13 />} />
          <Route path="/news14" element={<NEWS14 />} />
          <Route path="/news15" element={<NEWS15 />} />
          <Route path="/research" element={<Research />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="*" element={<Error />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/products" element={<Products />} />
          <Route path="/help" element={<Help />} />

          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;