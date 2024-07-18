import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-gray-900 dark:text-gray-100 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl w-full text-center">
        <div className="flex justify-between items-center mb-8 space-x-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1">
              <div className={`w-full h-2 rounded-full ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
              <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">{step.title}</div>
            </div>
          ))}
        </div>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">{steps[currentStep].title}</h2>
          <p className="text-lg mb-4">{steps[currentStep].content}</p>
          {steps[currentStep].code && (
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-left overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">{steps[currentStep].code}</code>
            </pre>
          )}
        </motion.div>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learning;
