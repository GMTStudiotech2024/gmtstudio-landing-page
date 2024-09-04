import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaSpinner, FaCopy, FaDownload } from 'react-icons/fa';
import { FiSettings, FiEye, FiEyeOff, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Component {
  type: string;
  props: Record<string, any>;
  children?: string | Component[];
}

const generateWebsite = async (input: string, theme: string): Promise<Component[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const lowercaseInput = input.toLowerCase();
  const components: Component[] = [];

  const themeColors = {
    light: { bg: '#ffffff', text: '#333333', accent: '#3498db', secondary: '#e74c3c', tertiary: '#2ecc71' },
    dark: { bg: '#2c3e50', text: '#ecf0f1', accent: '#3498db', secondary: '#e74c3c', tertiary: '#2ecc71' },
    nature: { bg: '#f1f8e9', text: '#33691e', accent: '#4caf50', secondary: '#ff9800', tertiary: '#2196f3' },
    modern: { bg: '#f5f5f5', text: '#212121', accent: '#00bcd4', secondary: '#ff4081', tertiary: '#ffc107' },
    vintage: { bg: '#f3e5d8', text: '#5d4037', accent: '#8d6e63', secondary: '#ff7043', tertiary: '#80cbc4' },
    minimalist: { bg: '#ffffff', text: '#212121', accent: '#757575', secondary: '#bdbdbd', tertiary: '#eeeeee' },
  };

  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.light;

  const includesAny = (words: string[]) => words.some(word => lowercaseInput.includes(word));

  // Base structure
  components.push({
    type: 'div',
    props: { style: { backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: 'Arial, sans-serif' } },
    children: []
  });

  const mainContent = components[0].children as Component[];

  // Header
  if (includesAny(['header', 'nav', 'menu', 'navigation', 'top'])) {
    mainContent.push({
      type: 'header',
      props: { 
        style: { 
          backgroundColor: colors.accent, 
          padding: '20px', 
          color: colors.bg,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        } 
      },
      children: [
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, children: [
          { type: 'h1', props: { style: { margin: 0 } }, children: 'Complex Website' },
          { type: 'nav', props: {}, children: [
            { type: 'ul', props: { style: { listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 } }, children: [
              { type: 'li', props: {}, children: [
                { type: 'a', props: { href: '#', style: { color: colors.bg, textDecoration: 'none' } }, children: 'Home' }
              ]},
              { type: 'li', props: { style: { position: 'relative' } }, children: [
                { type: 'a', props: { href: '#', style: { color: colors.bg, textDecoration: 'none' } }, children: 'Products ▼' },
                { type: 'ul', props: { style: { position: 'absolute', top: '100%', left: 0, backgroundColor: colors.accent, padding: '10px', display: 'none' } }, children: [
                  { type: 'li', props: {}, children: [
                    { type: 'a', props: { href: '#', style: { color: colors.bg, textDecoration: 'none' } }, children: 'Product 1' }
                  ]},
                  { type: 'li', props: {}, children: [
                    { type: 'a', props: { href: '#', style: { color: colors.bg, textDecoration: 'none' } }, children: 'Product 2' }
                  ]},
                ]}
              ]},
              { type: 'li', props: {}, children: [
                { type: 'a', props: { href: '#', style: { color: colors.bg, textDecoration: 'none' } }, children: 'About' }
              ]},
              { type: 'li', props: {}, children: [
                { type: 'a', props: { href: '#', style: { color: colors.bg, textDecoration: 'none' } }, children: 'Contact' }
              ]},
            ]}
          ]}
        ]}
      ]
    });
  }

  // Hero section with parallax effect
  if (includesAny(['hero', 'banner', 'showcase', 'intro', 'introduction'])) {
    mainContent.push({
      type: 'section',
      props: { 
        style: { 
          backgroundImage: 'url(https://source.unsplash.com/random/1600x900)', 
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: colors.bg, 
          padding: '150px 50px', 
          textAlign: 'center',
          position: 'relative',
        } 
      },
      children: [
        { type: 'div', props: { style: { 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)' 
        } }, children: [] },
        { type: 'div', props: { style: { position: 'relative', zIndex: 1 } }, children: [
          { type: 'h2', props: { style: { fontSize: '3em', marginBottom: '20px' } }, children: 'Welcome to Website' },
          { type: 'p', props: { style: { fontSize: '1.2em', marginBottom: '30px' } }, children: 'Discover our amazing products and services.' },
          { type: 'button', props: { style: { backgroundColor: colors.secondary, color: colors.bg, padding: '15px 30px', fontSize: '1.2em', border: 'none', borderRadius: '5px', cursor: 'pointer' } }, children: 'Get Started' }
        ]},
        { type: 'div', props: { style: { 
          position: 'absolute', 
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '100px',
          backgroundColor: colors.bg,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        } }, children: [
          { type: 'span', props: { style: { fontSize: '2em', color: colors.accent } }, children: '↓' }
        ] }
      ]
    });
  }

  // Features section with hover effects
  if (includesAny(['features', 'services', 'offerings', 'what we do', 'our work'])) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '100px 50px', backgroundColor: colors.bg } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', color: colors.accent, marginBottom: '60px', fontSize: '2.5em' } }, children: 'Our Features' },
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' } }, children: [
          { type: 'div', props: { style: { 
            width: '30%', 
            minWidth: '250px', 
            margin: '20px', 
            textAlign: 'center',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }
          } }, children: [
            { type: 'div', props: { style: { fontSize: '3em', color: colors.accent, marginBottom: '20px' } }, children: '🚀' },
            { type: 'h3', props: { style: { color: colors.secondary } }, children: 'Fast Performance' },
            { type: 'p', props: {}, children: 'Lightning-fast load times and smooth interactions.' }
          ]},
          { type: 'div', props: { style: { 
            width: '30%', 
            minWidth: '250px', 
            margin: '20px', 
            textAlign: 'center',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }
          } }, children: [
            { type: 'div', props: { style: { fontSize: '3em', color: colors.accent, marginBottom: '20px' } }, children: '🛡️' },
            { type: 'h3', props: { style: { color: colors.secondary } }, children: 'Secure Platform' },
            { type: 'p', props: {}, children: 'Top-notch security to protect your data.' }
          ]},
          { type: 'div', props: { style: { 
            width: '30%', 
            minWidth: '250px', 
            margin: '20px', 
            textAlign: 'center',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }
          } }, children: [
            { type: 'div', props: { style: { fontSize: '3em', color: colors.accent, marginBottom: '20px' } }, children: '📱' },
            { type: 'h3', props: { style: { color: colors.secondary } }, children: 'Mobile Friendly' },
            { type: 'p', props: {}, children: 'Fully responsive design for all devices.' }
          ]},
        ]}
      ]
    });
  }

  // Testimonials section with carousel effect
  if (includesAny(['testimonials', 'reviews', 'feedback', 'what people say', 'customer stories'])) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '100px 50px', backgroundColor: colors.tertiary, color: colors.bg } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', marginBottom: '60px', fontSize: '2.5em' } }, children: 'What Our Customers Say' },
        { type: 'div', props: { style: { 
          display: 'flex', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          '::-webkit-scrollbar': { display: 'none' }
        } }, children: [
          { type: 'div', props: { style: { 
            flex: '0 0 auto',
            width: '300px',
            margin: '0 20px',
            padding: '30px',
            backgroundColor: colors.bg,
            color: colors.text,
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            scrollSnapAlign: 'center'
          } }, children: [
            { type: 'p', props: { style: { fontStyle: 'italic', marginBottom: '10px' } }, children: '"This product changed my life! Highly recommended!"' },
            { type: 'p', props: { style: { fontWeight: 'bold' } }, children: '- John Doe' }
          ]},
          { type: 'div', props: { style: { 
            flex: '0 0 auto',
            width: '300px',
            margin: '0 20px',
            padding: '30px',
            backgroundColor: colors.bg,
            color: colors.text,
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            scrollSnapAlign: 'center'
          } }, children: [
            { type: 'p', props: { style: { fontStyle: 'italic', marginBottom: '10px' } }, children: '"Exceptional service and top-quality products. Will buy again!"' },
            { type: 'p', props: { style: { fontWeight: 'bold' } }, children: '- Jane Smith' }
          ]},
        ]}
      ]
    });
  }

  // Content section
  if (includesAny(['content', 'about', 'information', 'details', 'main'])) {
    mainContent.push({
      type: 'main',
      props: { style: { padding: '50px', maxWidth: '800px', margin: '0 auto' } },
      children: [
        { type: 'h2', props: { style: { color: colors.accent, marginBottom: '20px' } }, children: 'Main Content' },
        { type: 'p', props: { style: { marginBottom: '20px' } }, children: 'This is the main content area of the website. You can add more sections and details here to provide valuable information to your visitors.' },
        { type: 'p', props: { style: { marginBottom: '20px' } }, children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.' }
      ]
    });
  }

  // Call to action
  if (includesAny(['cta', 'call to action', 'sign up', 'get started', 'join', 'contact us'])) {
    mainContent.push({
      type: 'section',
      props: { style: { backgroundColor: colors.accent, color: colors.bg, padding: '50px', textAlign: 'center' } },
      children: [
        { type: 'h2', props: { style: { marginBottom: '20px' } }, children: 'Ready to Get Started?' },
        { type: 'p', props: { style: { marginBottom: '30px' } }, children: 'Join us today and experience the difference!' },
        { type: 'button', props: { style: { backgroundColor: colors.secondary, color: colors.bg, padding: '10px 20px', fontSize: '1em', border: 'none', borderRadius: '5px', cursor: 'pointer' } }, children: 'Sign Up Now' }
      ]
    });
  }

  // Footer
  if (includesAny(['footer', 'bottom', 'contact', 'links', 'social media'])) {
    mainContent.push({
      type: 'footer',
      props: { style: { backgroundColor: colors.accent, padding: '20px', color: colors.bg, textAlign: 'center' } },
      children: [
        { type: 'p', props: {}, children: '© 2023 My Awesome Website. All rights reserved.' },
        { type: 'div', props: { style: { marginTop: '10px' } }, children: [
          { type: 'a', props: { href: '#', style: { color: colors.bg, marginRight: '10px' } }, children: 'Privacy Policy' },
          { type: 'a', props: { href: '#', style: { color: colors.bg, marginRight: '10px' } }, children: 'Terms of Service' },
          { type: 'a', props: { href: '#', style: { color: colors.bg } }, children: 'Contact Us' }
        ]}
      ]
    });
  }

  // New creative sections

  // Interactive FAQ section
  if (includesAny(['faq', 'questions', 'answers'])) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '100px 50px', backgroundColor: colors.bg } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', color: colors.accent, marginBottom: '60px', fontSize: '2.5em' } }, children: 'Frequently Asked Questions' },
        { type: 'div', props: { style: { maxWidth: '800px', margin: '0 auto' } }, children: [
          { type: 'div', props: { style: { 
            marginBottom: '20px', 
            borderRadius: '10px', 
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          } }, children: [
            { type: 'div', props: { style: { 
              backgroundColor: colors.accent, 
              color: colors.bg, 
              padding: '15px 20px', 
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            } }, children: [
              { type: 'span', props: {}, children: 'How do I get started?' },
              { type: 'span', props: { style: { fontSize: '1.5em' } }, children: '+' }
            ]},
            { type: 'div', props: { style: { 
              backgroundColor: colors.bg, 
              padding: '20px', 
              display: 'none'
            } }, children: 'Getting started is easy! Simply sign up for an account and follow our step-by-step guide.' }
          ]},
          // ... more FAQ items ...
        ]}
      ]
    });
  }

  // Animated statistics section
  if (includesAny(['stats', 'numbers', 'figures', 'data'])) {
    mainContent.push({
      type: 'section',
      props: { style: { 
        padding: '100px 50px', 
        backgroundColor: colors.accent, 
        color: colors.bg,
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
        backgroundSize: '100px 100px',
        animation: 'slide 60s linear infinite'
      } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', marginBottom: '60px', fontSize: '2.5em' } }, children: 'Our Impact in Numbers' },
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' } }, children: [
          { type: 'div', props: { style: { textAlign: 'center', margin: '20px' } }, children: [
            { type: 'div', props: { style: { fontSize: '3em', fontWeight: 'bold', marginBottom: '10px' } }, children: '1M+' },
            { type: 'div', props: { style: { fontSize: '1.2em' } }, children: 'Happy Customers' }
          ]},
          // ... more statistic items ...
        ]}
      ]
    });
  }

  // Gallery
  if (includesAny(['gallery', 'portfolio', 'images', 'photos'])) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '50px', backgroundColor: colors.bg } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', color: colors.accent, marginBottom: '40px' } }, children: 'Our Gallery' },
        { type: 'div', props: { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' } }, children: [
          { type: 'img', props: { src: 'https://source.unsplash.com/random/300x300?1', alt: 'Gallery image 1', style: { width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' } } },
          { type: 'img', props: { src: 'https://source.unsplash.com/random/300x300?2', alt: 'Gallery image 2', style: { width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' } } },
          { type: 'img', props: { src: 'https://source.unsplash.com/random/300x300?3', alt: 'Gallery image 3', style: { width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' } } },
          { type: 'img', props: { src: 'https://source.unsplash.com/random/300x300?4', alt: 'Gallery image 4', style: { width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' } } },
        ]}
      ]
    });
  }

  // Pricing
  if (includesAny(['pricing', 'plans', 'packages', 'subscription'])) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '50px', backgroundColor: colors.tertiary } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', color: colors.text, marginBottom: '40px' } }, children: 'Our Pricing Plans' },
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' } }, children: [
          { type: 'div', props: { style: { backgroundColor: colors.bg, padding: '30px', borderRadius: '10px', width: '30%', minWidth: '250px', margin: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } }, children: [
            { type: 'h3', props: { style: { textAlign: 'center', color: colors.accent } }, children: 'Basic Plan' },
            { type: 'p', props: { style: { textAlign: 'center', fontSize: '2em', fontWeight: 'bold', margin: '20px 0' } }, children: '$9.99/mo' },
            { type: 'ul', props: { style: { listStyleType: 'none', padding: 0 } }, children: [
              { type: 'li', props: { style: { margin: '10px 0' } }, children: '✓ Feature 1' },
              { type: 'li', props: { style: { margin: '10px 0' } }, children: '✓ Feature 2' },
              { type: 'li', props: { style: { margin: '10px 0' } }, children: '✓ Feature 3' },
            ]},
            { type: 'button', props: { style: { display: 'block', width: '100%', padding: '10px', backgroundColor: colors.accent, color: colors.bg, border: 'none', borderRadius: '5px', cursor: 'pointer' } }, children: 'Choose Plan' },
          ]},
          // ... Add more pricing plans here ...
        ]}
      ]
    });
  }

  // Team
  if (includesAny(['team', 'staff', 'employees', 'our people'])) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '50px', backgroundColor: colors.bg } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', color: colors.accent, marginBottom: '40px' } }, children: 'Our Team' },
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' } }, children: [
          { type: 'div', props: { style: { width: '200px', margin: '20px', textAlign: 'center' } }, children: [
            { type: 'img', props: { src: 'https://source.unsplash.com/random/150x150?portrait1', alt: 'Team member 1', style: { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' } } },
            { type: 'h3', props: { style: { color: colors.secondary, marginTop: '10px' } }, children: 'John Doe' },
            { type: 'p', props: { style: { color: colors.text } }, children: 'CEO' },
          ]},
          // ... Add more team members here ...
        ]}
      ]
    });
  }

  return components;
};

const AIWebsiteGenerator: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedComponents, setGeneratedComponents] = useState<Component[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [theme, setTheme] = useState('light');
  const [layout, setLayout] = useState('default');
  const [customCSS, setCustomCSS] = useState('');
  const [animations, setAnimations] = useState(false);
  const [editingComponent, setEditingComponent] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [selectedPrompt, setSelectedPrompt] = useState('');

  const prompts = [
    "Create a modern business website with a hero section, features, and testimonials",
    "Design a portfolio website for a photographer with a gallery and about section",
    "Build an e-commerce website with product listings and a shopping cart",
    "Develop a blog website with article previews and a sidebar",
  ];

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setUserInput(prompt);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const components = await generateWebsite(userInput, theme);
      setGeneratedComponents(components);
      applyCustomStyles(components);
      if (animations) {
        addAnimations(components);
      }
      toast.success('Website generated successfully!');
    } catch (error) {
      console.error('Error generating website:', error);
      toast.error('Failed to generate website. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyCustomStyles = (components: Component[]) => {
    // Apply custom CSS to components
    // This is a placeholder function - implement the actual logic
  };

  const addAnimations = (components: Component[]) => {
    // Add animation properties to components
    // This is a placeholder function - implement the actual logic
  };

  const handleCopyCode = () => {
    const code = generateCode(generatedComponents);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const generateCode = (components: Component[]): string => {
    const componentToString = (comp: Component): string => {
      if (typeof comp.children === 'string') {
        return `<${comp.type} ${Object.entries(comp.props).map(([key, value]) => `${key}="${JSON.stringify(value)}"`).join(' ')}>
  ${comp.children}
</${comp.type}>`;
      } else if (Array.isArray(comp.children)) {
        return `<${comp.type} ${Object.entries(comp.props).map(([key, value]) => `${key}="${JSON.stringify(value)}"`).join(' ')}>
  ${comp.children.map(componentToString).join('\n  ')}
</${comp.type}>`;
      } else {
        return `<${comp.type} ${Object.entries(comp.props).map(([key, value]) => `${key}="${JSON.stringify(value)}"`).join(' ')} />`;
      }
    };

    return components.map(componentToString).join('\n\n');
  };

  const renderPreview = (components: Component[]) => {
    const renderComponent = (comp: Component, index: number): React.ReactNode => {
      if (typeof comp.children === 'string') {
        return React.createElement(comp.type, { ...comp.props, key: index, dangerouslySetInnerHTML: { __html: comp.children } });
      } else if (Array.isArray(comp.children)) {
        return React.createElement(comp.type, { ...comp.props, key: index }, comp.children.map(renderComponent));
      } else {
        return React.createElement(comp.type, { ...comp.props, key: index });
      }
    };

    return components.map(renderComponent);
  };

  const handleDownloadHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Website</title>
        <style>${customCSS}</style>
      </head>
      <body>
        ${generateCode(generatedComponents)}
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-website.html';
    a.click();
    URL.revokeObjectURL(url);
  };


  const handleComponentEdit = (index: number, newProps: Record<string, any>) => {
    const updatedComponents = [...generatedComponents];
    updatedComponents[index] = { ...updatedComponents[index], props: { ...updatedComponents[index].props, ...newProps } };
    setGeneratedComponents(updatedComponents);
  };

  useEffect(() => {
    // Generate suggestions based on user input
    const generateSuggestions = () => {
      const words = userInput.toLowerCase().split(' ');
      const newSuggestions = [
        'Add a contact form',
        'Include a photo gallery',
        'Create a blog section',
        'Implement a dark mode toggle',
        'Add social media links',
        'Include customer testimonials',
        'Create an FAQ section',
        'Add a newsletter signup form',
      ].filter(suggestion => 
        !words.some(word => suggestion.toLowerCase().includes(word))
      );
      setSuggestions(newSuggestions.slice(0, 3));
    };

    if (userInput.length > 0) {
      generateSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [userInput]);

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(prevInput => prevInput + ' ' + suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Mazs AI v1.0 Website Generator
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Input</h2>
              <div className="flex space-x-2">
                <button
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setShowPrompts(!showPrompts)}
                >
                  {showPrompts ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <FiSettings size={24} />
                </button>
              </div>
            </div>
            <div className="relative mb-6">
              <textarea
                className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base"
                placeholder="Describe your website in detail..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="absolute bottom-3 right-3 flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? <FaSpinner className="animate-spin" /> : <FaRocket />}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4"
                >
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Suggestions:</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={false}
              animate={{ height: showPrompts ? 'auto' : 0, opacity: showPrompts ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Quick Prompts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-md text-sm mb-2 transition-colors duration-300 ${
                      selectedPrompt === prompt
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => handlePromptSelect(prompt)}
                  >
                    {prompt.slice(0, 30)}...
                  </button>
                ))}
              </div>
            </motion.div>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 space-y-4"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Advanced Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Theme</label>
                    <select
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <option value="light">Light Theme</option>
                      <option value="dark">Dark Theme</option>
                      <option value="nature">Nature Theme</option>
                      <option value="modern">Modern Theme</option>
                      <option value="vintage">Vintage Theme</option>
                      <option value="minimalist">Minimalist Theme</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Layout</label>
                    <select
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={layout}
                      onChange={(e) => setLayout(e.target.value)}
                    >
                      <option value="default">Default Layout</option>
                      <option value="sidebar">Sidebar Layout</option>
                      <option value="grid">Grid Layout</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="animations"
                    checked={animations}
                    onChange={(e) => setAnimations(e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300"
                  />
                  <label htmlFor="animations" className="text-gray-700 dark:text-gray-300">Enable Animations</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom CSS</label>
                  <textarea
                    className="w-full h-20 p-3 border rounded-md dark:bg-gray-700 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Add custom CSS..."
                    value={customCSS}
                    onChange={(e) => setCustomCSS(e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Live Preview
              </h2>
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <FiEyeOff size={24} /> : <FiEye size={24} />}
              </button>
            </div>
            {showPreview && (
              <div className="border rounded-md p-4 bg-white dark:bg-gray-700 h-[600px] overflow-auto">
                {renderPreview(generatedComponents)}
              </div>
            )}
          </div>
        </div>
        {generatedComponents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-8 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Generated Components
            </h2>
            <div className="mb-4 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center"
                onClick={handleCopyCode}
              >
                <FaCopy className="mr-2" />
                {copiedCode ? 'Copied!' : 'Copy Code'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md flex items-center"
                onClick={handleDownloadHTML}
              >
                <FaDownload className="mr-2" />
                Download HTML
              </motion.button>
            </div>
            <div className="space-y-4">
              {generatedComponents.map((component, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">{component.type}</h3>
                  <pre className="text-sm overflow-x-auto bg-gray-200 dark:bg-gray-600 p-2 rounded">
                    <code>{JSON.stringify(component.props, null, 2)}</code>
                  </pre>
                  <button
                    className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => setEditingComponent(index)}
                  >
                    Edit
                  </button>
                  {editingComponent === index && (
                    <div className="mt-4">
                      <textarea
                        className="w-full h-40 p-2 border rounded-md dark:bg-gray-600 dark:text-white"
                        value={JSON.stringify(component.props, null, 2)}
                        onChange={(e) => {
                          try {
                            const newProps = JSON.parse(e.target.value);
                            handleComponentEdit(index, newProps);
                          } catch (error) {
                            console.error('Invalid JSON');
                          }
                        }}
                      />
                      <button
                        className="mt-2 bg-green-500 text-white py-1 px-2 rounded-md text-sm hover:bg-green-600 transition-colors duration-300"
                        onClick={() => setEditingComponent(null)}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AIWebsiteGenerator;