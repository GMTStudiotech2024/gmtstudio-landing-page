import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiMoon, FiSun, FiInfo, FiRefreshCw, FiLoader, FiPaperclip, FiX, FiFile, FiImage, FiMusic, FiVideo, FiCode, FiCpu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { debouncedHandleUserInput, getConversationSuggestions, processAttachedFile, getModelCalculations } from './chatbot';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  text: string;
  isUser: boolean;
  isTyping?: boolean;
  attachments?: File[];
}

const ChatBotUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const typingSpeed = 25; // milliseconds per character
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCalculations, setShowCalculations] = useState(false);
  const [calculations, setCalculations] = useState('');

  useEffect(() => {
    setSuggestions(getConversationSuggestions());
    addWelcomeMessage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isLoading && chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTop = scrollHeight;
    }
  }, [isLoading]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTop = scrollHeight;
    }
  };

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      text: "Hello! I'm Mazs AI v1.1 Anatra. I can help you with some basic tasks. How can I assist you today? although my Nerual network structure is not yet well designed, but i will try my best to help you  ",
      isUser: false
    };
    setMessages([welcomeMessage]);
  };

  const handleSend = async () => {
    if (isGenerating || (!input.trim() && attachedFiles.length === 0)) {
      return;
    }

    setIsGenerating(true);
    setIsLoading(true);

    const userMessage: Message = { 
      text: attachedFiles.length > 0 ? `Attached ${attachedFiles.length} file(s)` : input, 
      isUser: true,
      attachments: attachedFiles
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input immediately after sending
    setInput('');

    try {
      if (attachedFiles.length > 0) {
        await processFiles(attachedFiles);
      } else {
        const botResponse = await debouncedHandleUserInput(input);
        const botMessage: Message = { text: botResponse, isUser: false, isTyping: true };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setCurrentTypingIndex(0);

        // Update calculations
        const newCalculations = getModelCalculations(input);
        setCalculations(newCalculations);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage: Message = { text: "I'm sorry, I encountered an error. Please try again.", isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
      setAttachedFiles([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser && lastMessage.isTyping) {
      if (currentTypingIndex < lastMessage.text.length) {
        const timer = setTimeout(() => {
          setCurrentTypingIndex(currentTypingIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? { ...msg, isTyping: false } : msg
          )
        );
      }
    }
  }, [messages, currentTypingIndex]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const resetConversation = () => {
    setMessages([]);
    addWelcomeMessage();
    setSuggestions(getConversationSuggestions());
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachedFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
    }
  };

  const clearAttachedFile = (index: number) => {
    setAttachedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const processFiles = async (files: File[]) => {
    setIsLoading(true);
    try {
      const responses = await Promise.all(files.map(file => processAttachedFile(file)));
      const botMessage: Message = { 
        text: responses.join('\n\n'), 
        isUser: false, 
        isTyping: true,
        attachments: files
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentTypingIndex(0);
    } catch (error) {
      console.error("Error processing files:", error);
      const errorMessage: Message = { text: "I'm sorry, I encountered an error processing the files. Please try again.", isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setAttachedFiles([]);
    }
  };

  const getFileIcon = (file: File) => {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return <FiImage />;
      case 'audio':
        return <FiMusic />;
      case 'video':
        return <FiVideo />;
      case 'text':
        return file.name.endsWith('.json') || file.name.endsWith('.xml') || file.name.endsWith('.html') || file.name.endsWith('.css') || file.name.endsWith('.js') ? <FiCode /> : <FiFile />;
      default:
        return <FiFile />;
    }
  };

  const formatCalculations = (calculations: string) => {
    return calculations.split('\n').map((line, index) => {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        return `"${key.trim()}": "${value.trim()}"${index < calculations.split('\n').length - 1 ? ',' : ''}`;
      }
      return line;
    }).join('\n');
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 transition-colors duration-200 overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto p-4 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">Mazs AI Lab</h1>
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
              <button
                onClick={() => setShowCalculations(!showCalculations)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
              >
                <FiCpu />
              </button>
            </div>
          </div>
          {showInfo && (
            <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-800 dark:text-blue-200">
              <p>Mazs AI v1.1 Anatra is an advanced chatbot powered by natural language processing and machine learning. It can assist you with information about GMTStudio, Theta platform, and AI WorkSpace.</p>
            </div>
          )}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col">
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
                      transition={{ duration: 0.3 }}
                      className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
                    >
                      <span
                        className={`inline-block p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                        } max-w-[80%] sm:max-w-[70%] md:max-w-[60%] break-words`}
                      >
                        {message.isUser || !message.isTyping
                          ? message.text
                          : message.text.slice(0, currentTypingIndex)}
                        {!message.isUser && message.isTyping && (
                          <span className="inline-block w-1 h-4 ml-1 bg-gray-800 dark:bg-white animate-blink"></span>
                        )}
                      </span>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 text-left"
                    >
                      <span className="inline-flex items-center p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                        <FiLoader className="animate-spin mr-2" />
                        <span className="text-sm">Mazs AI v1.1 Anatra is thinking</span>
                        <span className="ml-1 inline-flex">
                          <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                        </span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-auto">
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
                <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="flex items-center p-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full"
                    >
                      <FiPaperclip size={24} className="stroke-current stroke-2" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileAttach}
                      className="hidden"
                      multiple
                    />
                    <div className="flex-1 flex items-center bg-white dark:bg-gray-800 rounded-lg overflow-x-auto">
                      {attachedFiles.length > 0 && (
                        <div className="flex items-center px-2 space-x-2 flex-shrink-0">
                          {attachedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 text-sm"
                            >
                              <span className="text-gray-500 dark:text-gray-400 mr-1">
                                {getFileIcon(file)}
                              </span>
                              <span className="text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
                                {file.name}
                              </span>
                              <button
                                onClick={() => clearAttachedFile(index)}
                                className="ml-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                              >
                                <FiX size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={attachedFiles.length > 0 ? "Add a message or send files..." : "Type your message..."}
                        className="flex-1 p-2 bg-transparent text-gray-800 dark:text-white focus:outline-none resize-none max-h-32 min-h-[40px]"
                        rows={1}
                      />
                    </div>
                    <button
                      onClick={handleSend}
                      className={`p-2 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full ${
                        isGenerating || (!input.trim() && attachedFiles.length === 0)
                          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                      }`}
                      disabled={isGenerating || (!input.trim() && attachedFiles.length === 0)}
                    >
                      <FiSend size={24} className="stroke-current stroke-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {showCalculations && (
              <div className="w-1/3 ml-4 flex flex-col">
                <div className="flex-1 overflow-hidden mb-4 rounded-lg bg-gray-900 shadow-inner transition-all duration-200">
                  <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                    <h2 className="text-lg font-semibold text-white">Neural Network Calculations</h2>
                    <button
                      onClick={() => setShowCalculations(false)}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <FiX />
                    </button>
                  </div>
                  <div className="overflow-y-auto h-full">
                    <SyntaxHighlighter
                      language="json"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                      }}
                    >
                      {formatCalculations(calculations)}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;