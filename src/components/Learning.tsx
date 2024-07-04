import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Learning: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-gray-900 dark:text-gray-100 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interactive Things for Fun
          </h1>
          <p className="text-xl">
            Type something in the input field below to see it displayed in real-time.
          </p>
        </motion.div>
        <motion.input
          type="text"
          value={text}
          onChange={handleChange}
          className="w-full px-4 py-2 text-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
          placeholder="Start typing here..."
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: text ? 1 : 0, y: text ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <p className="text-2xl">{text || 'Your typed text will appear here...'}</p>
        </motion.div>
      </div>
      <div className="max-w-2xl w-full mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">About How to Design a Website Using ChatGPT and Claude</h2>
        <h3 className="text-2xl font-bold mb-4 text-yellow-300">Prompt Engineering Guide</h3>
        <p className="text-lg mb-4">
          Learning how to craft effective prompts is crucial when working with AI. Here is a step-by-step guide on how to give a prompt to an AI, let's say you want a project landing page website using React JS, Tailwind CSS, and TypeScript:
        </p>
        <ol className="list-decimal list-inside text-lg mb-4">
          <li>
            Here's an example: You are a full-stack developer with extensive experience. I want you to build a website using React JS, Tailwind CSS, and TypeScript. The website is a landing page for a project I created. Can you provide a step-by-step guide on how to make it, including the file structure for easy understanding?
          </li>
        </ol>
        
        <h3 className="text-2xl font-bold mb-4 text-yellow-300">What Things You Will Need to Prepare?</h3>
        <p className="text-lg mb-4">
          After generating ideas with the AI, you may wonder how to implement them. Here are some essentials you might need:
        </p>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>
            Visual Studio Code
            <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="block mt-1 text-blue-500 underline">
              Visual Studio Code
            </a>
          </li>
          <li>
            Access to fresh water to stay hydrated
            <a href="https://www.healthline.com/nutrition/how-much-water-should-you-drink-per-day" target="_blank" rel="noopener noreferrer" className="block mt-1 text-blue-500 underline">
              Stay Hydrated
            </a>
          </li>
          <li>
            A calm and focused mind
            <a href="https://www.mindful.org/how-to-meditate/" target="_blank" rel="noopener noreferrer" className="block mt-1 text-blue-500 underline">
              Meditation Guide
            </a>
          </li>
          <li>
            Be ready to use keyboard shortcuts like Ctrl+A, Ctrl+C, and Ctrl+V
            <a href="https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-windows-10-dcc61a57-8ff0-cffe-9796-cb9706c75eec" target="_blank" rel="noopener noreferrer" className="block mt-1 text-blue-500 underline">
              Keyboard Shortcuts
            </a>
          </li>
        </ul>

        <h3 className="text-2xl font-bold mb-4 text-yellow-300">What If There Are Mistakes?</h3>
        <p className="text-lg mb-4">
          It's normal for AI to make mistakes. Here are some steps to address them:
        </p>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>
            Use the VS Code extension called Cody to help with bugs and errors.
            <a href="https://sourcegraph.com/cody" target="_blank" rel="noopener noreferrer" className="block mt-1 text-blue-500 underline">
              Cody Extension
            </a>
          </li>
          <li>
            Summon a <span className="text-yellow-300">Duck</span> to assist you by using the Live Share extension for collaborative debugging.
            <a href="https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare" target="_blank" rel="noopener noreferrer" className="block mt-1 text-blue-500 underline">
              Live Share Extension
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Learning;
