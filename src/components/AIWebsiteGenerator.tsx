import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCopy, FaRedo, FaSpinner, FaEye, FaPalette } from 'react-icons/fa';

interface Component {
  type: string;
  props: Record<string, any>;
  children?: string | Component[];
}

const generateWebsite = async (input: string, theme: string): Promise<Component[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const keywords = input.toLowerCase().split(' ');
  const components: Component[] = [];

  const themeColors = {
    light: { bg: '#ffffff', text: '#333333', accent: '#3498db', secondary: '#e74c3c', tertiary: '#2ecc71' },
    dark: { bg: '#2c3e50', text: '#ecf0f1', accent: '#3498db', secondary: '#e74c3c', tertiary: '#2ecc71' },
    nature: { bg: '#f1f8e9', text: '#33691e', accent: '#4caf50', secondary: '#ff9800', tertiary: '#2196f3' },
  };

  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.light;

  // Base structure
  components.push({
    type: 'div',
    props: { style: { backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: 'Arial, sans-serif' } },
    children: []
  });

  const mainContent = components[0].children as Component[];

  // Header with dropdown menu
  if (keywords.includes('header')) {
    mainContent.push({
      type: 'header',
      props: { style: { backgroundColor: colors.accent, padding: '20px', color: colors.bg } },
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

  // Hero section with background image
  if (keywords.includes('hero') || keywords.includes('banner')) {
    mainContent.push({
      type: 'section',
      props: { style: { 
        backgroundImage: 'url(https://source.unsplash.com/random/1600x900)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: colors.bg, 
        padding: '100px 50px', 
        textAlign: 'center',
        position: 'relative',
      } },
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
          { type: 'h2', props: { style: { fontSize: '3em', marginBottom: '20px' } }, children: 'Welcome to Our Complex Site' },
          { type: 'p', props: { style: { fontSize: '1.2em', marginBottom: '30px' } }, children: 'Discover our amazing products and services.' },
          { type: 'button', props: { style: { backgroundColor: colors.secondary, color: colors.bg, padding: '15px 30px', fontSize: '1.2em', border: 'none', borderRadius: '5px', cursor: 'pointer' } }, children: 'Get Started' }
        ]}
      ]
    });
  }

  // Features section with icons
  if (keywords.includes('features')) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '50px', backgroundColor: colors.bg } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', color: colors.accent, marginBottom: '40px' } }, children: 'Our Features' },
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' } }, children: [
          { type: 'div', props: { style: { width: '30%', minWidth: '250px', margin: '20px', textAlign: 'center' } }, children: [
            { type: 'div', props: { style: { fontSize: '3em', color: colors.accent, marginBottom: '20px' } }, children: '🚀' },
            { type: 'h3', props: { style: { color: colors.secondary } }, children: 'Fast Performance' },
            { type: 'p', props: {}, children: 'Lightning-fast load times and smooth interactions.' }
          ]},
          { type: 'div', props: { style: { width: '30%', minWidth: '250px', margin: '20px', textAlign: 'center' } }, children: [
            { type: 'div', props: { style: { fontSize: '3em', color: colors.accent, marginBottom: '20px' } }, children: '🛡️' },
            { type: 'h3', props: { style: { color: colors.secondary } }, children: 'Secure Platform' },
            { type: 'p', props: {}, children: 'Top-notch security to protect your data.' }
          ]},
          { type: 'div', props: { style: { width: '30%', minWidth: '250px', margin: '20px', textAlign: 'center' } }, children: [
            { type: 'div', props: { style: { fontSize: '3em', color: colors.accent, marginBottom: '20px' } }, children: '📱' },
            { type: 'h3', props: { style: { color: colors.secondary } }, children: 'Mobile Friendly' },
            { type: 'p', props: {}, children: 'Fully responsive design for all devices.' }
          ]},
        ]}
      ]
    });
  }

  // Testimonials section
  if (keywords.includes('testimonials')) {
    mainContent.push({
      type: 'section',
      props: { style: { padding: '50px', backgroundColor: colors.tertiary, color: colors.bg } },
      children: [
        { type: 'h2', props: { style: { textAlign: 'center', marginBottom: '40px' } }, children: 'What Our Customers Say' },
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' } }, children: [
          { type: 'div', props: { style: { width: '45%', minWidth: '300px', margin: '20px', backgroundColor: colors.bg, color: colors.text, padding: '20px', borderRadius: '10px' } }, children: [
            { type: 'p', props: { style: { fontStyle: 'italic', marginBottom: '10px' } }, children: '"This product changed my life! Highly recommended!"' },
            { type: 'p', props: { style: { fontWeight: 'bold' } }, children: '- John Doe' }
          ]},
          { type: 'div', props: { style: { width: '45%', minWidth: '300px', margin: '20px', backgroundColor: colors.bg, color: colors.text, padding: '20px', borderRadius: '10px' } }, children: [
            { type: 'p', props: { style: { fontStyle: 'italic', marginBottom: '10px' } }, children: '"Exceptional service and top-quality products. Will buy again!"' },
            { type: 'p', props: { style: { fontWeight: 'bold' } }, children: '- Jane Smith' }
          ]},
        ]}
      ]
    });
  }

  // Content section
  if (keywords.includes('content')) {
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
  if (keywords.includes('cta') || keywords.includes('action')) {
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
  if (keywords.includes('footer')) {
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

  return components;
};

const AIWebsiteGenerator: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedComponents, setGeneratedComponents] = useState<Component[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const components = await generateWebsite(userInput, theme);
      setGeneratedComponents(components);
    } catch (error) {
      console.error('Error generating website:', error);
      // Add error handling UI here
    } finally {
      setIsGenerating(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Advanced AI Website Generator
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <textarea
            className="w-full h-40 p-3 border rounded-md dark:bg-gray-700 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Describe your website in detail (e.g., 'Create a website with header, navigation, content, and footer')..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div className="mt-4 flex items-center justify-between">
            <select
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="nature">Nature Theme</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-6 rounded-md flex items-center justify-center text-white font-semibold transition-colors duration-300 ${
                isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaRocket className="mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Website'}
            </motion.button>
          </div>
        </div>
        {generatedComponents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Generated Website
            </h2>
            <div className="mb-4 flex space-x-4">
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
                className="bg-purple-500 text-white py-2 px-4 rounded-md flex items-center"
                onClick={() => setShowPreview(!showPreview)}
              >
                <FaEye className="mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </motion.button>
            </div>
            {showPreview ? (
              <div className="border rounded-md p-4 bg-white">
                {renderPreview(generatedComponents)}
              </div>
            ) : (
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {generateCode(generatedComponents)}
                </code>
              </pre>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIWebsiteGenerator;