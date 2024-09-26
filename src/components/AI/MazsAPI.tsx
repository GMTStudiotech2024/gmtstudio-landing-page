import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { processChatbotQuery } from './MazsAI';
import {
  EyeIcon,
  EyeSlashIcon,
  PlayIcon,
  ChartBarIcon,
  ClipboardIcon,
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid';

type ApiUsage = {
  requests: number;
  limit: number;
};

const ApiPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'playground' | 'key' | 'api'>('playground');
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [apiKey, setApiKey] = useState<string>('');
  const [apiUsage, setApiUsage] = useState<ApiUsage>({ requests: 0, limit: 10 });
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [playgroundInput, setPlaygroundInput] = useState<string>('');
  const [playgroundResult, setPlaygroundResult] = useState<string>('');
  const [displayedResult, setDisplayedResult] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [temperature, setTemperature] = useState(0.7);
  const [responseMetrics, setResponseMetrics] = useState({ tokens: 0, time: 0 });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [maxTokens, setMaxTokens] = useState(100);
  const [topP, setTopP] = useState(1);

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
  .then(data => console.log(data))
  .catch(error => console.error(error));
`,
      python: `# Sample API Code in Python
import requests

headers = {'Authorization': 'Bearer YOUR_API_KEY'}
try:
    response = requests.get('https://api.example.com/data', headers=headers)
    response.raise_for_status()
    data = response.json()
    print(data)
except requests.exceptions.RequestException as e:
    print(e)
`,
    }),
    []
  );

  const usagePercentage = useMemo(() => {
    return Math.min((apiUsage.requests / apiUsage.limit) * 100, 100);
  }, [apiUsage]);

  const handlePlaygroundSubmit = useCallback(async () => {
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

    const startTime = performance.now();
    // Use MazsAI to process the query
    const response = processChatbotQuery(playgroundInput);

    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);

    // Calculate token count (this is a simple example, you may need a more sophisticated method)
    const tokenCount = response.split(/\s+/).length;

    setResponseMetrics({
      tokens: tokenCount,
      time: responseTime,
    });

    // Initialize typing animation
    setPlaygroundResult(response);
    setDisplayedResult('');
    setIsTyping(true);
    setPlaygroundInput('');
  }, [apiKey, playgroundInput, temperature, maxTokens, topP]);

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

  return (
    <div className="api-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100">
      <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-10 pt-20">
        {/* Tabs */}
        <div
          className="tabs flex justify-center space-x-8 mb-12 border-b border-gray-200 dark:border-gray-800"
          role="tablist"
        >
          {['playground', 'key', 'api'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab as 'playground' | 'key' | 'api')}
              className={`text-lg font-semibold pb-2 transition-colors duration-300 ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content w-full max-w-5xl mx-auto mt-10">
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
                className="bg-blue-600 text-white py-3 px-12 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105"
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
                      aria-label={showApiKey ? 'Hide API Key' : 'Show API Key'}
                    >
                      {showApiKey ? (
                        <EyeSlashIcon className="h-6 w-6" />
                      ) : (
                        <EyeIcon className="h-6 w-6" />
                      )}
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="ml-2 text-gray-600 dark:text-gray-300 p-2 rounded hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      aria-label="Copy API Key"
                    >
                      <ClipboardIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={deleteApiKey}
                      className="ml-2 text-red-600 dark:text-red-400 p-2 rounded hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      aria-label="Delete API Key"
                    >
                      <TrashIcon className="h-6 w-6" />
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
            <div className="playground-tab bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">AI Playground</h3>
              <div className="flex flex-col space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="api-key"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          id="api-key"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Enter your API Key"
                          className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <button
                          onClick={toggleShowApiKey}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          aria-label={showApiKey ? 'Hide API Key' : 'Show API Key'}
                        >
                          {showApiKey ? (
                            <EyeSlashIcon className="h-6 w-6 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-6 w-6 text-gray-400" />
                          )}
                        </button>
                      </div>
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
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="Mazs AI v1.3.5 anatra">Mazs AI v1.3.5 anatra</option>
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
                        rows={6}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                      >
                        <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                        {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
                      </button>
                    </div>
                    {showAdvancedOptions && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="temperature"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Temperature: {temperature}
                          </label>
                          <input
                            type="range"
                            id="temperature"
                            min="0"
                            max="1"
                            step="0.01"
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="max-tokens"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Max Tokens: {maxTokens}
                          </label>
                          <input
                            type="range"
                            id="max-tokens"
                            min="1"
                            max="2048"
                            step="1"
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="top-p"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Top P: {topP}
                          </label>
                          <input
                            type="range"
                            id="top-p"
                            min="0"
                            max="1"
                            step="0.01"
                            value={topP}
                            onChange={(e) => setTopP(parseFloat(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Result
                      </label>
                      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-inner h-80 overflow-auto border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap font-mono">
                          {displayedResult || 'Result will appear here'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Response Metrics
                      </label>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Tokens: {responseMetrics.tokens}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Response Time: {responseMetrics.time} ms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-6 space-y-4 lg:space-y-0">
                  <button
                    onClick={handlePlaygroundSubmit}
                    className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105 flex items-center disabled:opacity-50"
                    disabled={!apiKey || apiUsage.requests >= apiUsage.limit}
                  >
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Run
                  </button>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2" />
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