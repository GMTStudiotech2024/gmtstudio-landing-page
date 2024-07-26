import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import OurProjects from './components/OurProjects';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Error from './components/Error';
import BlogPage1 from './components/BlogPage1';
import BlogPage2 from './components/BlogPage2';
import BlogPage3 from './components/BlogPage3';
import Research from './components/Research';
import Learning from './components/Learning';
import AboutUs from './components/AboutUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from '@vercel/analytics/react';
import './components/st.css';
import CustomCursor from './components/CustomCursor';
import { SpeedInsights } from '@vercel/speed-insights/react';
import CookieNotifier from './components/CookieNotifier';
import Contact from './components/ContactPage';
import SignUpLoginPage from './components/SignUp';
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
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Router>
      <div className="App bg-gray-900 min-h-screen flex flex-col">
        <CustomCursor />
        {isChatOpen && <ChatWidget onClose={toggleChat} />}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Blog />
                <Feature />
                <OurProjects />
                <AboutUs />
                <Testimonials />
              </>
            } />
            <Route path="/blogPage3" element={<BlogPage3 />} />
            <Route path="/blogPage1" element={<BlogPage1 />} />
            <Route path="/blogPage2" element={<BlogPage2 />} />
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
            <Route path="/research" element={<Research />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="*" element={<Error />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUpLoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/latest" element={<Latest />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <CookieNotifier />
      </div>
    </Router>
  );
};

export default App;