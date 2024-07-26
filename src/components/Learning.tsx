import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaHome, FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: "Step 1: Introduction",
    content: "In this tutorial, you will learn how to design a website using AI tools like ChatGPT and Claude.",
    code: null
  },
  {
    title: "Step 2: Crafting Effective Prompts",
    content: `Crafting effective prompts is crucial when working with AI. Here's an example prompt:`,
    code: `You are a full-stack developer with extensive experience. Build a website using React JS, Tailwind CSS, and TypeScript. The website is a landing page for a project I created. Can you provide a step-by-step guide on how to make it, including the file structure for easy understanding?`
  },
  {
    title: "Step 3: Preparation Essentials",
    content: `You will need the following tools:`,
    code: `- Visual Studio Code
- Access to fresh water to stay hydrated
- A calm and focused mind
- Be ready to use keyboard shortcuts like Ctrl+A, Ctrl+C, and Ctrl+V`
  },
  {
    title: "Step 4: Handling Mistakes",
    content: `It's normal for AI to make mistakes. Here are some steps to address them:`,
    code: `- Use the VS Code extension called Cody to help with bugs and errors.
- Summon a Duck to assist you by using the Live Share extension for collaborative debugging.
- Always tell the AI to enhance and expand on its responses to achieve better results.`
  },
  {
    title: "Step 5: Conclusion",
    content: "Now you know the basics of designing a website using AI. Practice crafting effective prompts and using the tools mentioned to create your own projects.",
    code: null
  }
];

const Learning: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl w-full text-center">
        <motion.div 
          className="flex justify-between items-center mb-12 space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flex-1 relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(index)}
            >
              <motion.div 
                className={`w-full h-3 rounded-full ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
              <motion.div 
                className={`text-xs mt-2 absolute w-full text-center ${index <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {step.title}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">{steps[currentStep].title}</h2>
            <p className="text-xl mb-6 leading-relaxed">{steps[currentStep].content}</p>
            {steps[currentStep].code && (
              <motion.pre 
                className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg text-left overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <code className="text-sm text-gray-800 dark:text-gray-200">{steps[currentStep].code}</code>
              </motion.pre>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft className="mr-2" /> Previous
          </motion.button>
          <motion.button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next <FaChevronRight className="ml-2" />
          </motion.button>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
            <FaHome className="inline-block mr-2" />
            Home
          </Link>
          <Link to="/about" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
            <FaInfoCircle className="inline-block mr-2" />
            About
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <FaLightbulb className="inline-block mr-2" />
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learning;
