import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiMoon, FiSun, FiInfo, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { debouncedHandleUserInput, getConversationSuggestions } from './chatbot';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBotUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSuggestions(getConversationSuggestions());
    addWelcomeMessage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      text: "Hello! I'm Mazs AI v1.0 Anatra. How can I assist you today?",
      isUser: false
    };
    setMessages([welcomeMessage]);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const botResponse = await debouncedHandleUserInput(input);
        const botMessage: Message = { text: botResponse, isUser: false };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error processing message:", error);
        const errorMessage: Message = { text: "I'm sorry, I encountered an error. Please try again.", isUser: false };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const resetConversation = () => {
    setMessages([]);
    addWelcomeMessage();
    setSuggestions(getConversationSuggestions());
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 transition-colors duration-200 overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto p-4 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">Mazs AI v1.0 Anatra</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
              >
                <FiInfo />
              </button>
              <button
                onClick={resetConversation}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
              >
                <FiRefreshCw />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
              >
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>
          {showInfo && (
            <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-800 dark:text-blue-200">
              <p>Mazs AI v1.0 Anatra is an advanced chatbot powered by natural language processing and machine learning. It can assist you with information about GMTStudio, Theta platform, and AI WorkSpace.</p>
            </div>
          )}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white dark:bg-gray-800 shadow-inner p-4 transition-all duration-200"
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className={`inline-block p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                    } max-w-[80%] sm:max-w-[70%] md:max-w-[60%] break-words`}
                  >
                    {message.text}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <div className="text-left mb-4">
                <motion.span 
                  className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="dots-animation">Mazs AI is thinking</span>
                </motion.span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {suggestions.length > 0 && messages.length === 1 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Suggestions:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 bg-transparent text-gray-800 dark:text-white focus:outline-none resize-none max-h-32"
              rows={1}
            />
            <button
              onClick={handleSend}
              className="p-3 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <FiSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;