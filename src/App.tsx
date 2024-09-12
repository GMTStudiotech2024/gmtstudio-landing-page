import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Landing_Page/Navbar';
import Search from './components/Landing_Page/Search';
import Hero from './components/Landing_Page/Hero';
import Feature from './components/Landing_Page/Feature';
import OurProjects from './components/Landing_Page/OurProjects';
import Blog from './components/Landing_Page/Blog';
import Footer from './components/Landing_Page/Footer';
import Error from './components/Pages/Error';
import Research from './components/Pages/Research';
import Learning from './components/Pages/Learning';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from '@vercel/analytics/react';
import './components/st.css';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Sidebar from './components/Pages/Sidebar';
import SignUp from './components/Pages/SignUp';
import Latest from './components/Pages/Latest';
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
import NEWS16 from './components/News/NEWS16';
import NEWS17 from './components/News/NEWS17';
import Products from './components/Pages/Products';
import Help from './components/Pages/Help';
import MazsAI from './components/AI/MazsAI_UI'; 
import LaunchGMTStudio from './components/Landing_Page/LaunchGMTStudio';
import SystemStatus from './components/Pages/SystemStatus';
import AdvancedSearch from './components/AI/AdvancedSearch';
import Login from './components/Pages/Login';
import AIWebsiteGenerator from './components/AI/AIWebsiteGenerator';
import CustomCursor from './components/CustomCursor';

const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const isHomePage = location.pathname === '/';
  const isMazsAIPage = location.pathname === '/mazsai';

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
      <CustomCursor isDarkMode={true} />
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
          <Route path="/news16" element={<NEWS16 />} />
          <Route path="/news17" element={<NEWS17 />} />
          <Route path="/research" element={<Research />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="*" element={<Error />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/products" element={<Products />} />
          <Route path="/help" element={<Help />} />
          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          <Route path="/mazsai" element={<MazsAI />} />
        </Routes>
        {!isMazsAIPage && <Footer />}
      </main>
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