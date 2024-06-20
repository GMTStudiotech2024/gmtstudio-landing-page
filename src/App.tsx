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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from "@vercel/analytics/react";


const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
                <OurProjects />
                <Feature />
                <Blog />
                <Testimonials />
              <Footer />
            </>
          } />
          <Route path="/blogPage1" element={<BlogPage1 />} />
          <Route path="/blogPage2" element={<BlogPage2 />} />
          <Route path="/blogPage3" element={<BlogPage3 />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
