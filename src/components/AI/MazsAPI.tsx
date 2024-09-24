import React, { useState, useMemo, useEffect } from 'react';

type ApiUsage = {
  requests: number;
  limit: number;
};

const ApiPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'key' | 'playground'>('api');
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [apiKey, setApiKey] = useState<string>('');
  const [apiUsage, setApiUsage] = useState<ApiUsage>({ requests: 0, limit: 1000 });
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [playgroundInput, setPlaygroundInput] = useState<string>('');
  const [playgroundResult, setPlaygroundResult] = useState<string>('');

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
    setApiUsage({ requests: 0, limit: 1000 });
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
      setApiUsage({ requests: 0, limit: 1000 });
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

  const handlePlaygroundSubmit = () => {
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

    // Simulate API response
    setPlaygroundResult(`You entered: ${playgroundInput}`);
    setPlaygroundInput('');
  };

  return (
    <div className="api-page min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="container mx-auto flex flex-col items-center py-20 px-6 md:px-12">
        {/* Tabs */}
        <div className="tabs flex space-x-8 mb-12 border-b border-gray-300 dark:border-gray-700" role="tablist">
          {['api', 'key', 'playground'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab as 'api' | 'key' | 'playground')}
              className={`text-lg font-medium focus:outline-none pb-2 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-500 border-b-4 border-transparent hover:text-blue-600 hover:border-blue-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content w-full max-w-5xl">
          {activeTab === 'api' && (
            <div className="api-tab">
              <div className="language-select mb-10 flex justify-center items-center">
                <label htmlFor="language-select" className="mr-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                  Select Language:
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'javascript' | 'python')}
                  className="p-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </select>
              </div>
              <div className="code-snippet bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl shadow-lg overflow-auto">
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
                className="bg-indigo-600 text-white py-3 px-10 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                Generate API Key
              </button>
              {apiKey && (
                <div className="mt-8">
                  <div className="inline-flex items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-xl shadow-inner">
                    <code className="text-lg font-mono text-gray-900 dark:text-gray-100">
                      {showApiKey ? apiKey : maskApiKey(apiKey)}
                    </code>
                    <button
                      onClick={toggleShowApiKey}
                      className="ml-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    >
                      {showApiKey ? (
                        // Hide Icon (Eye Off)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 3.293a1 1 0 00-1.414 1.414l2.746 2.746C2.805 10.378 1.593 12.606 1.25 13.5a1 1 0 001.96.28c.184-.71.569-1.88 1.785-3.296L6.162 7.46a1 1 0 011.414 0L10 9.293l2.424-2.424a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414L10 10l-2.707-2.707a1 1 0 00-1.414 0z"
                            clipRule="evenodd"
                          />
                          <path d="M10 5c-5 0-8 4-8 5s3 5 8 5 8-4 8-5-3-5-8-5z" />
                        </svg>
                      ) : (
                        // Show Icon (Eye)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 3C5 3 1 7 0 10c1 3 5 7 10 7s9-4 10-7c-1-3-5-7-10-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
                          <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={deleteApiKey}
                      className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="ml-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-16">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">API Usage</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Requests: {apiUsage.requests} / {apiUsage.limit}
                </p>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${usagePercentage}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Usage: {usagePercentage.toFixed(2)}%</p>
              </div>
            </div>
          )}
          {activeTab === 'playground' && (
            <div className="playground-tab text-center">
              {!apiKey ? (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Enter Your API Key</h3>
                  <input
                    type="text"
                    value={playgroundInput}
                    onChange={(e) => setPlaygroundInput(e.target.value)}
                    placeholder="Paste your API Key here"
                    className="w-full max-w-md p-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <button
                    onClick={() => {
                      if (playgroundInput.trim() === '') {
                        alert('Please enter a valid API Key.');
                        return;
                      }
                      setApiKey(playgroundInput.trim());
                      setPlaygroundInput('');
                      setApiUsage((prev) => ({ ...prev, requests: 0 }));
                    }}
                    className="mt-4 bg-green-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  >
                    Save API Key
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Playground</h3>
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={playgroundInput}
                      onChange={(e) => setPlaygroundInput(e.target.value)}
                      placeholder="Enter your query"
                      className="w-full max-w-md p-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button
                      onClick={handlePlaygroundSubmit}
                      className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      disabled={apiUsage.requests >= apiUsage.limit}
                    >
                      Submit
                    </button>
                  </div>
                  {playgroundResult && (
                    <div className="mt-6 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                      <p className="text-lg text-gray-800 dark:text-gray-100">{playgroundResult}</p>
                    </div>
                  )}
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">API Usage</h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                      Requests: {apiUsage.requests} / {apiUsage.limit}
                    </p>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mb-2">
                      <div
                        className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{
                          width: `${usagePercentage}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Usage: {usagePercentage.toFixed(2)}%</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiPage;