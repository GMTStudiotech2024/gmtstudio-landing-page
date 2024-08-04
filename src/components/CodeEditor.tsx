import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('// Write your code here');

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg p-4 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-white mb-4">Code Editor</h2>
      <textarea
        className="w-full h-64 bg-gray-900 text-green-400 font-mono p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={code}
        onChange={handleCodeChange}
        spellCheck="false"
      />
      <div className="mt-4 text-gray-300">
        <p>Characters: {code.length}</p>
        <p>Lines: {code.split('\n').length}</p>
      </div>
    </motion.div>
  );
};

export default CodeEditor;