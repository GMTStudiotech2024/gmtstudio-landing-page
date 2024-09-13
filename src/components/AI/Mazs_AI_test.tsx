import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiMoon, FiSun, FiInfo, FiRefreshCw, FiLoader, FiPaperclip, FiX, FiFile, FiImage, FiMusic, FiVideo, FiCode, FiRepeat, FiMic, FiCopy, FiTrash2, FiEdit, FiShare, FiArchive, FiPlus, FiCheck, FiSettings, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { debouncedHandleUserInput, getConversationSuggestions, processAttachedFile, regenerateResponse, getChatHistories, createChatHistory, renameChatHistory, deleteChatHistory } from './MazsAI_test';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as MazsAI from './MazsAI_test';


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
  const [isTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const typingSpeed = 24; // milliseconds per character
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [,setIsScrolledToBottom] = useState(true);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [, setSelectedChatHistory] = useState<string | null>(null);
  const [newChatName, setNewChatName] = useState('');
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [editingHistoryName, setEditingHistoryName] = useState('');
  const [userName, setUserName] = useState(() => {
    // Try to get the userName from localStorage, or use "User" as default
    return localStorage.getItem('userName') || "User(change it if you want)" ;
  });
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const botName = "Mazs AI v1.3.0 Anatra";

  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('fontSize') || '16');
  });
  const [sendKey, setSendKey] = useState(() => {
    return localStorage.getItem('sendKey') || 'Enter';
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'English';
  });
  const [chatFontFamily, setChatFontFamily] = useState(() => {
    return localStorage.getItem('chatFontFamily') || 'monospace';
  });
  const [autoGenerateTitle, setAutoGenerateTitle] = useState(() => {
    return localStorage.getItem('autoGenerateTitle') === 'true';
  });
  const [sendPreviewBubble, setSendPreviewBubble] = useState(() => {
    return localStorage.getItem('sendPreviewBubble') === 'true';
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userAvatar, setUserAvatar] = useState(() => {
    // Try to get the userAvatar from localStorage, or use default emoji
    return localStorage.getItem('userAvatar') || '👤';
  });
  const [isCheckingForUpdates, setIsCheckingForUpdates] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'up-to-date' | 'update-available' | null>(null);

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
      text: "Hello! I'm Mazs AI v1.3.0 Anatra. I How can I assist you today? ",
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
    if (
      (sendKey === 'Enter' && e.key === 'Enter' && !e.shiftKey) ||
      (sendKey === 'Ctrl + Enter' && e.key === 'Enter' && e.ctrlKey)
    ) {
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
    localStorage.setItem('fontSize', newSize.toString());
  };

  const handleSendKeyChange = (newSendKey: string) => {
    setSendKey(newSendKey);
    localStorage.setItem('sendKey', newSendKey);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleChatFontFamilyChange = (newFontFamily: string) => {
    setChatFontFamily(newFontFamily || 'monospace');
    localStorage.setItem('chatFontFamily', newFontFamily || 'monospace');
  };

  const handleAutoGenerateTitleChange = (newValue: boolean) => {
    setAutoGenerateTitle(newValue);
    localStorage.setItem('autoGenerateTitle', newValue.toString());
  };

  const handleSendPreviewBubbleChange = (newValue: boolean) => {
    setSendPreviewBubble(newValue);
    localStorage.setItem('sendPreviewBubble', newValue.toString());
  };

  const checkForUpdates = () => {
    setIsCheckingForUpdates(true);
    setUpdateStatus(null);
    // Simulate an API call or actual update check
    setTimeout(() => {
      setIsCheckingForUpdates(false);
      // Simulate a random result (replace this with actual update check logic)
      const isUpToDate = Math.random() > 0.5;
      setUpdateStatus(isUpToDate ? 'up-to-date' : 'update-available');
    }, 2000); // Simulating a 2-second delay
  };

  useEffect(() => {
    if (updateStatus) {
      const timer = setTimeout(() => {
        setUpdateStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [updateStatus]);

  const handleEmojiClick = (emojiObject: any) => {
    const newAvatar = emojiObject.emoji;
    setUserAvatar(newAvatar);
    setShowEmojiPicker(false);
    localStorage.setItem('userAvatar', newAvatar);
  };

  const renderUpdateSection = () => (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Version Information</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Current Version:</span>
        <span className="font-medium text-black dark:text-white">v1.3.0 Anatra</span>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={checkForUpdates}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            isCheckingForUpdates ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isCheckingForUpdates}
        >
          {isCheckingForUpdates ? (
            <span className="flex items-center">
              <FiLoader className="animate-spin mr-2" />
              Checking for updates...
            </span>
          ) : (
            'Check for Updates'
          )}
        </button>
        {updateStatus && (
          <span className={`flex items-center ${
            updateStatus === 'up-to-date' ? 'text-green-500' : 'text-yellow-500'
          }`}>
            {updateStatus === 'up-to-date' ? (
              <>
                <FiCheckCircle className="mr-2" />
                Mazs AI is up to date
              </>
            ) : (
              <>
                <FiAlertCircle className="mr-2" />
                Update available
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-8 w-[800px] max-w-full max-h-[90vh] overflow-y-auto shadow-xl relative"
        style={{ fontSize: `${fontSize}px`, fontFamily: chatFontFamily || 'inherit' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <FiX size={28} />
          </button>
        </div>
        {renderUpdateSection()}
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-lg font-medium text-gray-600 dark:text-gray-400 w-12 text-center">{fontSize}px</span>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              User Avatar
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-3xl">
                {userAvatar}
              </div>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-lg"
              >
                Change Avatar
              </button>
            </div>
            {showEmojiPicker && (
              <div className="absolute mt-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Send Key
              </label>
              <select 
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-lg"
                value={sendKey}
                onChange={(e) => handleSendKeyChange(e.target.value)}
              >
                <option>Enter</option>
                <option>Ctrl + Enter</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-lg"
                onChange={(e) => setIsDarkMode(e.target.value === 'Dark')}
                value={isDarkMode ? 'Dark' : 'Light'}
              >
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select 
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-lg"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chat Font Family
              </label>
              <input
                type="text"
                value={chatFontFamily}
                onChange={(e) => handleChatFontFamilyChange(e.target.value)}
                placeholder="Font Family Name"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-lg"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={autoGenerateTitle}
                onChange={(e) => handleAutoGenerateTitleChange(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 block text-lg text-gray-700 dark:text-gray-300">
                Auto Generate Title
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={sendPreviewBubble}
                onChange={(e) => handleSendPreviewBubbleChange(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 block text-lg text-gray-700 dark:text-gray-300">
                Send Preview Bubble
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 block text-lg text-gray-700 dark:text-gray-300">
                Mask Splash Screen
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 block text-lg text-gray-700 dark:text-gray-300">
                Hide Builtin Masks
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">System Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-600 dark:text-gray-400">Last Update:</span>
                <span className="text-lg font-medium text-gray-800 dark:text-white">Not sync yet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-600 dark:text-gray-400">Local Data:</span>
                <span className="text-lg font-medium text-gray-800 dark:text-white">1 chats, 2 messages, 0 prompts, 0 masks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 transition-colors duration-200 overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto p-4 h-full flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center mb-6 sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 py-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mazs AI Lab • Preview</h1>
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
                <p className="text-sm">Mazs AI v1.3.0 Anatra is an advanced chatbot powered by natural language processing and machine learning. It can assist you with information about GMTStudio, Theta platform, and AI WorkSpace.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ fontSize: `${fontSize}px`, fontFamily: chatFontFamily || 'monospace' }}
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
                    <span className="text-sm">Mazs AI v1.3.0 Anatra is thinking</span>
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
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm hover:shadow-md"
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
                    <span className="inline-flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm shadow-md">
                      <span className="font-medium">User is typing</span>
                      <span className="ml-1 inline-flex">
                        <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                      </span>
                    </span>
                  </motion.div>
                )}
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full"
                    title="Attach files"
                  >
                    <FiPaperclip size={24} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileAttach}
                    className="hidden"
                    multiple
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center overflow-x-auto py-2 px-2 space-x-2">
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-200 dark:bg-gray-600 px-2 py-1 text-sm rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <span className="text-gray-500 dark:text-gray-400 mr-1">
                            {getFileIcon(file)}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
                            {file.name}
                          </span>
                          <button
                            onClick={() => clearAttachedFile(index)}
                            className="ml-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 focus:outline-none"
                            title="Remove file"
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}
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
                      className={`w-full p-2 bg-transparent text-gray-800 dark:text-white focus:outline-none resize-none min-h-[30px] max-h-[50px] ${
                        input.length > 1000 ? 'border-red-500' : ''
                      } scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent`}
                      style={{ fontSize: `${fontSize}px`, fontFamily: chatFontFamily || 'monospace' }}
                    />
                    <div className="flex justify-between items-center px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className={`font-medium ${input.length > 1000 ? 'text-red-500' : ''}`}>
                        {input.length}/1000
                      </span>
                      {input.length > 900 && (
                        <span className="text-yellow-500 dark:text-yellow-400 animate-pulse">
                          Approaching character limit
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 px-2">
                    <button
                      onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                      className={`p-2 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full ${
                        isRecording ? 'text-red-500 animate-pulse' : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                      }`}
                      title={isRecording ? "Stop recording" : "Start voice recording"}
                    >
                      <FiMic size={24} className="stroke-current stroke-2" />
                    </button>
                    <button
                      onClick={handleSend}
                      className={`p-2 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full ${
                        isGenerating || (!input.trim() && attachedFiles.length === 0) || input.length > 1000
                          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                      }`}
                      disabled={isGenerating || (!input.trim() && attachedFiles.length === 0) || input.length > 1000}
                      title="Send message"
                    >
                      <FiSend size={24} className="stroke-current stroke-2" />
                    </button>
                  </div>
                </div>
                {showVoiceRecorder && renderVoiceRecorder()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                <span className="font-medium">Mazs AI v1.3.0 Anatra</span> can make mistakes. Please verify important information.
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSettings && renderSettings()}
      {showChatHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-[480px] max-w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chat History</h2>
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
                  className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button
                  onClick={handleCreateChatHistory}
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <FiPlus size={24} />
                </button>
              </div>
            </div>
            <ul className="space-y-4">
              {chatHistories.map((history) => (
                <li key={history.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
                  {editingHistoryId === history.id ? (
                    <div className="flex items-center p-4">
                      <input
                        type="text"
                        value={editingHistoryName}
                        onChange={(e) => setEditingHistoryName(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                      <button
                        onClick={handleFinishEditHistory}
                        className="ml-2 p-2 text-green-500 hover:text-green-600 transition-colors duration-200"
                      >
                        <FiCheck size={20} />
                      </button>
                      <button
                        onClick={() => setEditingHistoryId(null)}
                        className="ml-2 p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4">
                      <span className="text-gray-800 dark:text-white font-medium truncate flex-grow">{history.name}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSelectChatHistory(history.id)}
                          className="p-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
                          title="Select Chat"
                        >
                          <FiCheck size={20} />
                        </button>
                        <button
                          onClick={() => handleStartEditHistory(history)}
                          className="p-2 text-yellow-500 hover:text-yellow-600 transition-colors duration-200 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900"
                          title="Edit Chat Name"
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteChatHistory(history.id)}
                          className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                          title="Delete Chat"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {chatHistories.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                <FiArchive size={48} className="mx-auto mb-4" />
                <p>No chat histories yet. Create a new one to get started!</p>
              </div>
            )}
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