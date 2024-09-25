import React, { useState, useMemo, useEffect } from 'react';
import { processChatbotQuery } from './MazsAI';

type ApiUsage = {
  requests: number;
  limit: number;
};

const ApiPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'key' | 'playground'>('api');
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [apiKey, setApiKey] = useState<string>('');
  const [apiUsage, setApiUsage] = useState<ApiUsage>({ requests: 0, limit: 10 });
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [playgroundInput, setPlaygroundInput] = useState<string>('');
  const [playgroundResult, setPlaygroundResult] = useState<string>('');
  const [displayedResult, setDisplayedResult] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Load apiKey from localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  // Save apiKey to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    } else {
      localStorage.removeItem('apiKey');
    }
  }, [apiKey]);

  const generateApiKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const apiKeyLength = 20;
    const newApiKey = Array.from({ length: apiKeyLength }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
    setApiKey(newApiKey);
    setShowApiKey(false);
    setApiUsage({ requests: 0, limit: 10 });
  };

  const copyToClipboard = async () => {
    if (!apiKey) return;
    try {
      await navigator.clipboard.writeText(apiKey);
      alert('API Key copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy API Key:', error);
      alert('Failed to copy API Key. Please try again.');
    }
  };

  const toggleShowApiKey = () => {
    setShowApiKey((prev) => !prev);
  };

  const deleteApiKey = () => {
    if (window.confirm('Are you sure you want to delete your API key?')) {
      setApiKey('');
      setShowApiKey(false);
      setApiUsage({ requests: 0, limit: 10 });
      setPlaygroundResult('');
    }
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 4) return key;
    const visiblePart = key.slice(0, 4);
    const maskedPart = '*'.repeat(key.length - 4);
    return `${visiblePart}${maskedPart}`;
  };

  const fakeApiCode = useMemo(
    () => ({
      javascript: `// Sample API Code in JavaScript
fetch('https://api.example.com/data', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
})
  .then(response => response.json())
  .then(data => console.log(data));
`,
      python: `# Sample API Code in Python
import requests

headers = {'Authorization': 'Bearer YOUR_API_KEY'}
response = requests.get('https://api.example.com/data', headers=headers)
print(response.json())
`,
    }),
    []
  );

  const usagePercentage = useMemo(() => {
    return Math.min((apiUsage.requests / apiUsage.limit) * 100, 100);
  }, [apiUsage]);

  const handlePlaygroundSubmit = async () => {
    if (!apiKey) {
      alert('Please enter a valid API Key to use the playground.');
      return;
    }

    if (playgroundInput.trim() === '') {
      alert('Please enter some input to send to the API.');
      return;
    }

    // Simulate API usage
    setApiUsage((prev) => ({
      ...prev,
      requests: prev.requests + 1,
    }));

    // Use MazsAI to process the query
    const response = processChatbotQuery(playgroundInput);

    // Initialize typing animation
    setPlaygroundResult(response);
    setDisplayedResult('');
    setIsTyping(true);
    setPlaygroundInput('');
  };

  // Typing animation effect
  useEffect(() => {
    if (isTyping) {
      let index = 0;
      const typingSpeed = 10; // Adjust typing speed here (milliseconds per character)

      const interval = setInterval(() => {
        setDisplayedResult((prev) => prev + playgroundResult.charAt(index));
        index++;
        if (index >= playgroundResult.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [isTyping, playgroundResult]);

  // Load any necessary custom fonts or styles for an Apple-like look
  // For example, import 'SF Pro Display' font if available

  return (
    <div className="api-page min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-100">
      <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-10 pt-20">
        {/* Tabs */}
        <div
          className="tabs flex justify-center space-x-16 mb-12 border-b border-gray-200 dark:border-gray-800"
          role="tablist"
        >
          {['api', 'key', 'playground'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab as 'api' | 'key' | 'playground')}
              className={`text-lg font-semibold pb-2 transition-colors duration-300 ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content w-full max-w-4xl mx-auto mt-10">
          {activeTab === 'api' && (
            <div className="api-tab">
              <div className="language-select mb-10 flex justify-center items-center">
                <label
                  htmlFor="language-select"
                  className="mr-4 text-lg font-medium text-gray-700 dark:text-gray-300"
                >
                  Select Language:
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'javascript' | 'python')}
                  className="p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </select>
              </div>
              <div className="code-snippet bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg overflow-auto">
                <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">
                  <code>{fakeApiCode[language]}</code>
                </pre>
              </div>
            </div>
          )}
          {activeTab === 'key' && (
            <div className="key-tab text-center">
              <button
                onClick={generateApiKey}
                className="bg-blue-500 text-white py-3 px-12 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
              >
                Generate API Key
              </button>
              {apiKey && (
                <div className="mt-8">
                  <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                    <code className="text-lg font-mono text-gray-900 dark:text-gray-100">
                      {showApiKey ? apiKey : maskApiKey(apiKey)}
                    </code>
                    <button
                      onClick={toggleShowApiKey}
                      className="ml-4 text-gray-600 dark:text-gray-300 p-2 rounded hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      {/* Use modern icons here */}
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="ml-4 text-gray-600 dark:text-gray-300 p-2 rounded hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      Copy
                    </button>
                    <button
                      onClick={deleteApiKey}
                      className="ml-4 text-red-600 dark:text-red-400 p-2 rounded hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-16">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">API Usage</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Requests: {apiUsage.requests} / {apiUsage.limit}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${usagePercentage}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Usage: {usagePercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          )}
          {activeTab === 'playground' && (
            <div className="playground-tab bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Playground</h3>
              <div className="flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row md:space-x-8">
                  <div className="flex-1 space-y-6">
                    <div>
                      <label
                        htmlFor="api-key"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        API Key
                      </label>
                      <input
                        type="text"
                        id="api-key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API Key"
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="model"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Model
                      </label>
                      <select
                        id="model"
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                      >
                        <option value="Mazs AI v1.3.5 anatra">Mazs AI v1.3.5 anatra</option>
                        {/* Add other model options here */}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="playground-input"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Input
                      </label>
                      <textarea
                        id="playground-input"
                        value={playgroundInput}
                        onChange={(e) => setPlaygroundInput(e.target.value)}
                        placeholder="Enter your query"
                        rows={5}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                  <div className="flex-1 mt-8 md:mt-0">
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Result
                    </label>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm h-full overflow-auto">
                      <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                        {displayedResult || 'Result will appear here'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={handlePlaygroundSubmit}
                    className="bg-blue-500 text-white py-3 px-8 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                    disabled={!apiKey || apiUsage.requests >= apiUsage.limit}
                  >
                    Submit
                  </button>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Requests: {apiUsage.requests} / {apiUsage.limit}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiPage;