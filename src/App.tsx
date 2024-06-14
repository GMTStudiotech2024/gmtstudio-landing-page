import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import AboutUs from './components/AboutUs';
import OurProjects from './components/OurProjects';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Feature />
      <AboutUs />
      <OurProjects />
      <Testimonials />
      <Blog />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
