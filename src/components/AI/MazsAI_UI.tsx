import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiMoon, FiSun, FiInfo, FiRefreshCw, FiLoader, FiPaperclip, FiX, FiFile, FiImage, FiMusic, FiVideo, FiCode, FiRepeat, FiMic, FiCopy, FiArrowDown, FiTrash2, FiEdit, FiShare, FiArchive, FiPlus, FiCheck, FiSettings  } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { debouncedHandleUserInput, getConversationSuggestions, processAttachedFile, regenerateResponse, getChatHistories, createChatHistory, renameChatHistory, deleteChatHistory } from './MazsAI_v1-1-0Anatra';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as MazsAI from './MazsAI_v1-1-0Anatra';


import EmojiPicker from 'emoji-picker-react';
interface Message {
  text: string;
  isUser: boolean;
  isTyping?: boolean;
  attachments?: File[];
  timestamp: Date;
  userName?: string;
}

interface ChatHistory {
  id: string;
  name: string;
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
  const [isRecording, setIsRecording] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [selectedChatHistory, setSelectedChatHistory] = useState<string | null>(null);
  const [newChatName, setNewChatName] = useState('');
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [editingHistoryName, setEditingHistoryName] = useState('');
  const [userName, setUserName] = useState(() => {
    // Try to get the userName from localStorage, or use "User" as default
    return localStorage.getItem('userName') || "User(change it if you want)" ;
  });
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const botName = "Mazs AI v1.1.0 Anatra";

  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userAvatar, setUserAvatar] = useState(() => {
    // Try to get the userAvatar from localStorage, or use default emoji
    return localStorage.getItem('userAvatar') || '👤';
  });
  useEffect(() => {
    setSuggestions(getConversationSuggestions());
    addWelcomeMessage();
    loadChatHistories();
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

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setIsScrolledToBottom(scrollHeight - scrollTop === clientHeight);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      text: "Hello! I'm Mazs AI v1.1.0 Anatra. I How can I assist you today? ",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleSend = async () => {
    if (isGenerating || (!input.trim() && attachedFiles.length === 0) || input.length > 1000) {
      return;
    }

    setIsGenerating(true);
    setIsLoading(true);

    const userMessage: Message = { 
      text: attachedFiles.length > 0 ? `Attached ${attachedFiles.length} file(s)` : input, 
      isUser: true,
      attachments: attachedFiles,
      timestamp: new Date(),
      userName: userName
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input immediately after sending
    setInput('');

    try {
      if (attachedFiles.length > 0) {
        await processFiles(attachedFiles);
      } else {
        const botResponse = await debouncedHandleUserInput(input);
        const botMessage: Message = { text: botResponse, isUser: false, isTyping: true, timestamp: new Date() };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setCurrentTypingIndex(0);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage: Message = { text: "I'm sorry, I encountered an error. Please try again.", isUser: false, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
      setAttachedFiles([]);
    }
  };

  const regenerateResponseHandler = async (index: number) => {
    const userMessage = messages[index - 1]; // Assuming the user message is always before the AI response
    if (userMessage && !userMessage.isUser) {
      setIsGenerating(true);
      setIsLoading(true);

      try {
        const regeneratedResponse = await regenerateResponse(userMessage.text);
        const newMessage: Message = { 
          text: regeneratedResponse, 
          isUser: false, 
          isTyping: true,
          timestamp: new Date()
        };
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, index),
          newMessage,
          ...prevMessages.slice(index + 1)
        ]);
        setCurrentTypingIndex(0);
      } catch (error) {
        console.error("Error regenerating response:", error);
      } finally {
        setIsGenerating(false);
        setIsLoading(false);
      }
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
        attachments: files,
        timestamp: new Date()
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentTypingIndex(0);
    } catch (error) {
      console.error("Error processing files:", error);
      const errorMessage: Message = { text: "I'm sorry, I encountered an error processing the files. Please try again.", isUser: false, timestamp: new Date() };
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

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Implement voice recognition logic here
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optionally, show a toast notification
  };

  const scrollToBottomButton = () => (
    <button
      onClick={scrollToBottom}
      className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-8 p-2 bg-blue-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${
        isScrolledToBottom ? 'opacity-0' : 'opacity-100'
      } z-50`}
    >
      <FiArrowDown size={24} />
    </button>
  );

  const renderVoiceRecorder = () => (
    <div className="absolute bottom-full mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {isRecording ? 'Recording...' : 'Click to start recording'}
      </p>
      <button
        onClick={handleVoiceInput}
        className={`p-4 rounded-full ${
          isRecording
            ? 'bg-red-500 animate-pulse'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors duration-200`}
      >
        <FiMic size={24} />
      </button>
    </div>
  );

  const handleMessageContextMenu = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setSelectedMessageIndex(index);
    setShowContextMenu(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const closeContextMenu = () => {
    setShowContextMenu(false);
    setSelectedMessageIndex(null);
  };

  const deleteMessage = (index: number) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
    closeContextMenu();
  };

  const editMessage = (index: number) => {
    // Implement edit functionality
    closeContextMenu();
  };

  const shareMessage = (index: number) => {
    // Implement share functionality
    closeContextMenu();
  };

  const loadChatHistories = async () => {
    const histories = await getChatHistories();
    setChatHistories(histories);
  };

  const handleCreateChatHistory = async () => {
    if (newChatName.trim()) {
      await createChatHistory(newChatName.trim());
      setNewChatName('');
      loadChatHistories();
    }
  };

  const handleRenameChatHistory = async (id: string, newName: string) => {
    await renameChatHistory(id, newName);
    loadChatHistories();
  };

  const handleDeleteChatHistory = async (id: string) => {
    await deleteChatHistory(id);
    loadChatHistories();
  };

  const handleSelectChatHistory = async (id: string) => {
    setSelectedChatHistory(id);
    setShowChatHistory(false);
    const messages = await loadMessagesForChatHistory(id);
    setMessages(messages);
  };

  const loadMessagesForChatHistory = async (id: string): Promise<Message[]> => {
    // Fetch messages for the selected chat history
    try {
      const messages = await MazsAI.getChatHistoryMessages(id);
      return messages;
    } catch (error) {
      console.error("Error loading chat history messages:", error);
      return [];
    }
  };

  const handleStartEditHistory = (history: ChatHistory) => {
    setEditingHistoryId(history.id);
    setEditingHistoryName(history.name);
  };

  const handleFinishEditHistory = async () => {
    if (editingHistoryId && editingHistoryName.trim()) {
      await handleRenameChatHistory(editingHistoryId, editingHistoryName.trim());
      setEditingHistoryId(null);
      setEditingHistoryName('');
    }
  };

  const handleUserNameEdit = () => {
    setIsEditingUserName(true);
  };

  const handleUserNameSave = () => {
    setIsEditingUserName(false);
    // Save the userName to localStorage
    localStorage.setItem('userName', userName);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
  };

  const checkForUpdates = () => {
    // Implement version checking logic here
    console.log("Checking for updates...");
  };

  const handleEmojiClick = (emojiObject: any) => {
    setUserAvatar(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const renderSettings = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[800px] max-w-full max-h-[90vh] overflow-y-auto shadow-xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Font Size
            </label>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => handleFontSizeChange(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{fontSize}px</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              User Avatar
            </label>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-2xl">
                {userAvatar}
              </div>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Change Avatar
              </button>
            </div>
            {showEmojiPicker && (
              <div className="absolute mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Version
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">v1.1 Anatra</span>
              <button
                onClick={checkForUpdates}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Check for Updates
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Send Key
            </label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              <option>Enter</option>
              <option>Ctrl + Enter</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Theme
            </label>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              onChange={(e) => setIsDarkMode(e.target.value === 'Dark')}
              value={isDarkMode ? 'Dark' : 'Light'}
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Chat Font Family
            </label>
            <input
              type="text"
              placeholder="Font Family Name"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Auto Generate Title
            </label>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Send Preview Bubble
            </label>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Update
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-400">Not sync yet</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Local Data
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-400">1 chats, 2 messages, 0 prompts, 0 masks</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mask Splash Screen
            </label>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hide Builtin Masks
            </label>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`} style={{ fontSize: `${fontSize}px` }}>
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 transition-colors duration-200 overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto p-4 h-full flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center mb-6 sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 py-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mazs AI Lab</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200"
                title="Info"
              >
                <FiInfo size={20} />
              </button>
              <button
                onClick={resetConversation}
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200"
                title="Reset Conversation"
              >
                <FiRefreshCw size={20} />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <button
                onClick={() => setShowChatHistory(!showChatHistory)}
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200"
                title="Chat History"
              >
                <FiArchive size={20} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200"
                title="Settings"
              >
                <FiSettings size={20} />
              </button>
            </div>
          </header>

          {/* Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-blue-800 dark:text-blue-200 shadow-md"
              >
                <p className="text-sm">Mazs AI v1.1 Anatra is an advanced chatbot powered by natural language processing and machine learning. It can assist you with information about GMTStudio, Theta platform, and AI WorkSpace.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    onContextMenu={(e) => handleMessageContextMenu(e, index)}
                  >
                    <div className={`max-w-[70%] ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'} rounded-lg p-3 shadow-md`}>
                      <div className="flex items-center mb-1">
                        {message.isUser ? (
                          <>
                            {!isEditingUserName && (
                              <button
                                onClick={handleUserNameEdit}
                                className="text-white hover:text-gray-700 dark:text-white dark:hover:text-gray-200 mr-2"
                              >
                                <FiEdit size={12} />
                              </button>
                            )}
                            <span className="text-sm font-semibold text-yellow-300 dark:text-yellow-400">
                              {isEditingUserName ? (
                                <input
                                  type="text"
                                  value={userName}
                                  onChange={handleUserNameChange}
                                  onBlur={handleUserNameSave}
                                  className="bg-transparent border-b border-blue-600 dark:border-blue-400 focus:outline-none text-right "
                                />
                              ) : (
                                <>
                                  <span className="mr-2">{userAvatar}</span>
                                  {userName}
                                </>
                              )}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            {botName}
                          </span>
                        )}
                      </div>
                      <p className="text-sm break-words">
                        {message.isUser || !message.isTyping
                          ? message.text
                          : message.text.slice(0, currentTypingIndex)}
                        {!message.isUser && message.isTyping && (
                          <span className="inline-block w-1 h-4 ml-1 bg-gray-800 dark:bg-white animate-blink"></span>
                        )}
                      </p>
                      <div className="mt-2 text-xs opacity-70 flex justify-between items-center">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {!message.isUser && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(message.text)}
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                              title="Copy to clipboard"
                            >
                              <FiCopy size={12} />
                            </button>
                            <button
                              onClick={() => regenerateResponseHandler(index)}
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                              title="Regenerate response"
                              disabled={isGenerating}
                            >
                              <FiRepeat size={12} className={isGenerating ? 'animate-spin' : ''} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
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
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              {suggestions.length > 0 && messages.length === 1 && (
                <div className="mb-4 hidden sm:block">
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
              <div className="relative">
                {userTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-full left-0 mb-2 z-10"
                  >
                    <span className="inline-flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                      <span>User is typing</span>
                      <span className="ml-1 inline-flex">
                        <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                      </span>
                    </span>
                  </motion.div>
                )}
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <FiPaperclip size={20} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileAttach}
                    className="hidden"
                    multiple
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center overflow-x-auto">
                      {attachedFiles.length > 0 && (
                        <div className="flex items-center px-2 space-x-2 flex-shrink-0">
                          {attachedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-200 dark:bg-gray-600 px-2 py-1 text-sm rounded-full"
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
                    </div>
                    <textarea
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value.slice(0, 1000));
                        setUserTyping(true);
                        setTimeout(() => setUserTyping(false), 1000);
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder={attachedFiles.length > 0 ? "Add a message or send files..." : "Type your message..."}
                      className={`flex-1 p-2 bg-transparent text-gray-800 dark:text-white focus:outline-none resize-none max-h-32 min-h-[40px] ${
                        input.length > 1000 ? 'border-red-500' : ''
                      }`}
                      rows={1}
                    />
                    <div className="flex justify-between items-center px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className={input.length > 1000 ? 'text-red-500' : ''}>{input.length}/1000 characters</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                      className={`p-2 mr-2 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full ${
                        isRecording ? 'text-red-500' : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                      }`}
                    >
                      <FiMic size={24} className="stroke-current stroke-2" />
                    </button>
                    {showVoiceRecorder && renderVoiceRecorder()}
                  </div>
                  <button
                    onClick={handleSend}
                    className={`p-2 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full ${
                      isGenerating || (!input.trim() && attachedFiles.length === 0) || input.length > 1000
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                    }`}
                    disabled={isGenerating || (!input.trim() && attachedFiles.length === 0) || input.length > 1000}
                  >
                    <FiSend size={24} className="stroke-current stroke-2" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center pb-2 pt-1">
                  Mazs AI v1.1.0 Anatra can make mistakes. Please verify important information.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isScrolledToBottom && scrollToBottomButton()}
      {showSettings && renderSettings()}
      {showChatHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Chat Histories</h2>
              <button
                onClick={() => setShowChatHistory(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  placeholder="New chat name"
                  className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCreateChatHistory}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <FiPlus size={24} />
                </button>
              </div>
            </div>
            <ul className="space-y-3">
              {chatHistories.map((history) => (
                <li key={history.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 transition-all duration-200 hover:shadow-md">
                  {editingHistoryId === history.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingHistoryName}
                        onChange={(e) => setEditingHistoryName(e.target.value)}
                        className="flex-grow p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleFinishEditHistory}
                        className="p-1 text-green-500 hover:text-green-600 transition-colors duration-200"
                      >
                        <FiCheck size={20} />
                      </button>
                      <button
                        onClick={() => setEditingHistoryId(null)}
                        className="p-1 text-red-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 dark:text-white font-medium">{history.name}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSelectChatHistory(history.id)}
                          className="p-1 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        >
                          <FiCheck size={20} />
                        </button>
                        <button
                          onClick={() => handleStartEditHistory(history)}
                          className="p-1 text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteChatHistory(history.id)}
                          className="p-1 text-red-500 hover:text-red-600 transition-colors duration-200"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {showContextMenu && selectedMessageIndex !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="fixed bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <button
            onClick={() => deleteMessage(selectedMessageIndex)}
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiTrash2 className="mr-2" /> Delete Message
          </button>
          <button
            onClick={() => editMessage(selectedMessageIndex)}
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiEdit className="mr-2" /> Edit Message
          </button>
          <button
            onClick={() => shareMessage(selectedMessageIndex)}
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiShare className="mr-2" /> Share Message
          </button>
          <button
            onClick={closeContextMenu}
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiX className="mr-2" /> Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ChatBotUI;