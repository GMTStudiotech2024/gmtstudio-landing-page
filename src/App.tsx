import React, { useEffect } from 'react';
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
import AboutUs from './components/AboutUs'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from "@vercel/analytics/react";
import './components/st.css';
import CustomCursor from './components/CustomCursor';
import { SpeedInsights } from "@vercel/speed-insights/react"
import CookieNotifier from './components/CookieNotifier';
import Contact from './components/ContactPage'
import SignUpLoginPage from './components/SignUp'
import Latest from './components/Latest'
const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <div className="App bg-gray-900 min-h-screen flex flex-col">
        <CustomCursor />
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
            <Route path="/research" element={<Research />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="*" element={<Error />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/SignUp" element={<SignUpLoginPage />} />
            <Route path="/Latest" element={<Latest />} />
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