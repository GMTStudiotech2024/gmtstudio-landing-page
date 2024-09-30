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
import { motion, AnimatePresence } from 'framer-motion';
import { LockClosedIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/solid';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hardcoded credentials (you can modify these)
  const validUsername = 'GMT001A';
  const validPassword = 'GMTStudioMazsAI';

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      if (rememberMe) {
        localStorage.setItem('rememberedUser', username);
      } else {
        localStorage.removeItem('rememberedUser');
      }
    } else {
      setErrorMessage('Invalid username or password');
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    setErrorMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Implement forgot password logic here
    alert(`Password reset link sent to ${forgotPasswordEmail}`);
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
    setIsLoading(false);
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

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

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-96"
        >
          <AnimatePresence mode="wait">
            {!showForgotPassword ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Welcome Back</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2 rounded text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                  </label>
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-500 hover:text-blue-600 transition"
                  >
                    Forgot password?
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
                )}
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Forgot Password</h2>
                <div className="relative mb-6">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
                )}
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Back to Login
                  </button>
                  <button
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="api-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 pt-20">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Improved Tabs */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-2">
          <div className="flex justify-between items-center">
            {['playground', 'key', 'api'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'playground' | 'key' | 'api')}
                className={`flex-1 py-3 px-4 text-center rounded-lg transition-colors duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2">
            {activeTab === 'playground' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-6">AI Playground</h3>
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
            {activeTab === 'key' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-6">API Key Management</h3>
                <div className="text-center">
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
              </div>
            )}
            {activeTab === 'api' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-6">API Documentation</h3>
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
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Projects Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4">Projects Progress</h4>
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">0%</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">0 Remaining Projects</p>
                  <p className="text-lg font-semibold">No Active Projects</p>
                </div>
              </div>
            </div>

            {/* Free Slots */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4">Free Slots Available</h4>
              <div className="grid grid-cols-3 gap-4">
                {[12, 18, 20, 2, 10, 15].map((day) => (
                  <div key={day} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                    <p className="text-lg font-semibold">{day}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">June</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4">Balance</h4>
              <p className="text-2xl font-bold my-2">$0.00</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Working on Project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPage;
