import React, { useState, useEffect, useRef } from 'react';
import {
  FiSend,
  FiLoader,
  FiPaperclip,
  FiX,
  FiFile,
  FiImage,
  FiMusic,
  FiVideo,
  FiCode,
  FiRepeat,
  FiMic,
  FiCopy,
  FiTrash2,
  FiEdit,
  FiShare,
  FiPlus,
  FiCheck,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
  FiClock,
} from 'react-icons/fi';
import { TbApi, TbHistory  } from "react-icons/tb";
import { LuPaintbrush } from "react-icons/lu";
import { RiSettings3Line } from "react-icons/ri";

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import * as MazsAI from './MazsAI';
import EmojiPicker from 'emoji-picker-react';
import './MazsAI_UI.css';
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

interface IconButtonProps {
  onClick: () => void;
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  title,
  ariaLabel,
  children,
}) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    title={title}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

const MazsAIChat: React.FC = () => {
  // State Management
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const typingSpeed = 15; // milliseconds per character
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [, setIsScrolledToBottom] = useState(true);
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
    return localStorage.getItem('userName') || 'User';
  });
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const botName = 'Mazs AI';

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
    return localStorage.getItem('userAvatar') || '👤';
  });
  const [isCheckingForUpdates, setIsCheckingForUpdates] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'up-to-date' | 'update-available' | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Added state for new features
  const [isFAQOpen] = useState(false);
  const [, setIsShortcutsModalOpen] = useState(false);

  // Additional States for Sidebar Navigation
  // eslint-disable-next-line no-empty-pattern
  const [] = useState<'home' | 'chatHistory' | 'settings' | 'faq'>('home');

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Effects
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedSendKey = localStorage.getItem('sendKey');
    const savedLanguage = localStorage.getItem('language');
    const savedFontFamily = localStorage.getItem('chatFontFamily');

    if (savedAvatar) setUserAvatar(savedAvatar);
    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedSendKey) setSendKey(savedSendKey);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedFontFamily) setChatFontFamily(savedFontFamily);
  }, []);

  useEffect(() => {
    setSuggestions(MazsAI.getConversationSuggestions());
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

  useEffect(() => {
    if (updateStatus) {
      const timer = setTimeout(() => {
        setUpdateStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [updateStatus]);

  useEffect(() => {
    // Load theme from localStorage
    const darkMode = localStorage.getItem('isDarkMode');
    if (darkMode) {
      setIsDarkMode(JSON.parse(darkMode));
    }
  }, []);

  // Helper Functions
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setIsScrolledToBottom(scrollHeight - scrollTop === clientHeight);
    }
  };

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      text: "Hello! I'm Mazs AI. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const handleSend = async () => {
    if (
      isGenerating ||
      (!input.trim() && attachedFiles.length === 0) ||
      input.length > 1000
    ) {
      return;
    }

    setIsGenerating(true);
    setIsLoading(true);

    const userMessage: Message = {
      text: attachedFiles.length > 0 ? `Attached ${attachedFiles.length} file(s)` : input,
      isUser: true,
      attachments: attachedFiles,
      timestamp: new Date(),
      userName: userName,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    try {
      if (attachedFiles.length > 0) {
        await processFiles(attachedFiles);
      } else {
        const botResponse = await MazsAI.debouncedHandleUserInput(input);
        const botMessage: Message = {
          text: botResponse,
          isUser: false,
          isTyping: true,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setCurrentTypingIndex(0);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        text: "I'm sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
      setAttachedFiles([]);
    }
  };

  const regenerateResponseHandler = async (index: number) => {
    const userMessage = messages[index - 1];
    if (userMessage && !userMessage.isUser) {
      setIsGenerating(true);
      setIsLoading(true);

      try {
        const regeneratedResponse = await MazsAI.regenerateResponse(userMessage.text);
        const newMessage: Message = {
          text: regeneratedResponse,
          isUser: false,
          isTyping: true,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, index),
          newMessage,
          ...prevMessages.slice(index + 1),
        ]);
        setCurrentTypingIndex(0);
      } catch (error) {
        console.error('Error regenerating response:', error);
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


  const resetConversation = () => {
    setMessages([]);
    addWelcomeMessage();
    setSuggestions(MazsAI.getConversationSuggestions());
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const clearAttachedFile = (index: number) => {
    setAttachedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const processFiles = async (files: File[]) => {
    setIsLoading(true);
    try {
      const responses = await Promise.all(files.map((file) => MazsAI.processAttachedFile(file)));
      const botMessage: Message = {
        text: responses.join('\n\n'),
        isUser: false,
        isTyping: true,
        attachments: files,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentTypingIndex(0);
    } catch (error) {
      console.error('Error processing files:', error);
      const errorMessage: Message = {
        text: "I'm sorry, I encountered an error processing the files. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
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
        return <FiImage className="text-blue-500" />;
      case 'audio':
        return <FiMusic className="text-green-500" />;
      case 'video':
        return <FiVideo className="text-purple-500" />;
      case 'text':
        if (
          file.name.endsWith('.json') ||
          file.name.endsWith('.xml') ||
          file.name.endsWith('.html') ||
          file.name.endsWith('.css') ||
          file.name.endsWith('.js')
        ) {
          return <FiCode className="text-yellow-500" />;
        }
        return <FiFile className="text-gray-500" />;
      default:
        return <FiFile className="text-gray-500" />;
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
    <div className="absolute bottom-full mb-2 bg-white dark:bg-black rounded-lg shadow-lg p-4">
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
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
  }
  
  const ConfirmationModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-black text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
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
    const histories = await MazsAI.getChatHistories();
    setChatHistories(histories);
  };

  const handleCreateChatHistory = async () => {
    if (newChatName.trim()) {
      await MazsAI.createChatHistory(newChatName.trim());
      setNewChatName('');
      loadChatHistories();
    }
  };

  const handleRenameChatHistory = async (id: string, newName: string) => {
    await MazsAI.renameChatHistory(id, newName);
    loadChatHistories();
  };

  const handleDeleteChatHistory = async (id: string) => {
    await MazsAI.deleteChatHistory(id);
    loadChatHistories();
  };

  const handleSelectChatHistory = async (id: string) => {
    setSelectedChatHistory(id);
    setShowChatHistory(false);
    const messages = await loadMessagesForChatHistory(id);
    setMessages(messages);
  };

  const loadMessagesForChatHistory = async (id: string): Promise<Message[]> => {
    try {
      const messages = await MazsAI.getChatHistoryMessages(id);
      return messages;
    } catch (error) {
      console.error('Error loading chat history messages:', error);
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
    setChatFontFamily(newFontFamily || 'Arial, sans-serif');
    localStorage.setItem('chatFontFamily', newFontFamily || 'Arial, sans-serif');
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
      const isUpToDate = true; // Assume the app is up to date
      setUpdateStatus(isUpToDate ? 'up-to-date' : 'update-available');
    }, 2000);
  };

  const handleEmojiClick = (emojiObject: any) => {
    const newAvatar = emojiObject.emoji;
    setUserAvatar(newAvatar);
    setShowEmojiPicker(false);
    localStorage.setItem('userAvatar', newAvatar);
  };

  const renderFAQSection = () => (
    <div
      className="bg-gray-100 dark:bg-black rounded-lg p-4 mb-4"
      role="region"
      aria-labelledby="faq-section"
    >
      <h3
        id="faq-section"
        className="text-lg font-semibold text-gray-800 dark:text-white mb-2"
      >
        Frequently Asked Questions
      </h3>
      <ul className="space-y-2">
        <li className="text-black dark:text-gray-300">
          <strong>Q:</strong> How do I reset the conversation?
          <br />
          <strong>A:</strong> Click on the refresh icon at the top-right corner.
        </li>
        <li className="text-black dark:text-gray-300">
          <strong>Q:</strong> Can I change the theme?
          <br />
          <strong>A:</strong> Yes, go to Settings and select Light or Dark theme.
        </li>
        {/* Add more FAQs as needed */}
      </ul>
    </div>
  );


  const renderUpdateSection = () => (
    <div
      className="bg-gray-100 dark:bg-black rounded-lg p-4 mb-4"
      role="region"
      aria-labelledby="version-information"
    >
      <h3
        id="version-information"
        className="text-lg font-semibold text-gray-800 dark:text-white mb-2"
      >
        Version Information
      </h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Current Version:
        </span>
        <span className="font-medium text-black dark:text-white">
          v1.3.5 Anatra
        </span>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={checkForUpdates}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            isCheckingForUpdates ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isCheckingForUpdates}
          aria-label="Check for Updates"
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
          <span
            className={`flex items-center ${
              updateStatus === 'up-to-date'
                ? 'text-green-500'
                : 'text-yellow-500'
            }`}
          >
            {updateStatus === 'up-to-date' ? (
              <>
                <FiCheckCircle className="mr-1" />
                Mazs AI is up to date
              </>
            ) : (
              <>
                <FiAlertCircle className="mr-1" />
                Update available
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        className=" bg-white dark:bg-black rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl"
        style={{ fontSize: `${fontSize}px`, fontFamily: chatFontFamily }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold dark:text-white text-black">
            Settings
          </h2>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
            aria-label="Close Settings"
          >
            <FiX size={28} />
          </button>
        </div>
        {renderUpdateSection()}
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
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
                aria-label="Font Size"
              />
              <span className="text-lg font-medium text-gray-400 w-12 text-center">
                {fontSize}px
              </span>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              User Avatar
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-black rounded-full text-3xl">
                {userAvatar}
              </div>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-lg"
                aria-label="Change Avatar"
              >
                Change Avatar
              </button>
            </div>
            {showEmojiPicker && (
              <div className="absolute mt-4 z-50 bg-white dark:bg-black rounded-lg shadow-lg p-4">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Send Key
              </label>
              <select
                className="w-full p-3 border border-gray-600 rounded-md bg-white text-black dark:bg-black dark:text-white text-lg"
                value={sendKey}
                onChange={(e) => handleSendKeyChange(e.target.value)}
                aria-label="Send Key"
              >
                <option>Enter</option>
                <option>Ctrl + Enter</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Theme
              </label>
              <select
                className="w-full p-3 border border-gray-600 rounded-md bg-white text-black dark:bg-black dark:text-white text-lg transition-colors duration-300"
                onChange={(e) => setIsDarkMode(e.target.value === 'Dark')}
                value={isDarkMode ? 'Dark' : 'Light'}
                aria-label="Theme Selection"
              >
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                className="w-full p-3 border border-gray-600 rounded-md bg-white text-black dark:bg-black dark:text-white text-lg"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                aria-label="Language Selection"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                {/* Add more languages as needed */}
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Chat Font Family
              </label>
              <select
                value={chatFontFamily}
                onChange={(e) => handleChatFontFamilyChange(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-md bg-white text-black dark:bg-black dark:text-white text-lg"
                aria-label="Chat Font Family"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Courier New', Courier, monospace">Courier New</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                <option value="'Verdana', sans-serif">Verdana</option>
                <option value="monospace">Monospace</option>
                {/* Add more font options as needed */}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={autoGenerateTitle}
                onChange={(e) => handleAutoGenerateTitleChange(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                aria-label="Auto Generate Title"
              />
              <label className="ml-3 block text-lg text-gray-300">
                Auto Generate Title
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={sendPreviewBubble}
                onChange={(e) => handleSendPreviewBubbleChange(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                aria-label="Send Preview Bubble"
              />
              <label className="ml-3 block text-lg text-gray-300">
                Send Preview Bubble
              </label>
            </div>
            {/* Add more settings options as needed */}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              System Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-400">
                  Last Update:
                </span>
                <span className="text-lg font-medium text-white">
                  Not synced yet
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-400">
                  Local Data:
                </span>
                <span className="text-lg font-medium text-white">
                  1 chat, 2 messages, 0 prompts, 0 masks
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setIsShortcutsModalOpen(true)}
              className="px-4 py-2 bg-white text-black dark:bg-black dark:text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
              aria-label="Open Shortcuts"
            >
              Shortcuts
            </button>
          </div>
        </div>
      </div>
      {isFAQOpen && renderFAQSection()}
    </div>
  );

  const renderChatHistory = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Chat History
          </h2>
          <button
            onClick={() => setShowChatHistory(false)}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
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
              className="flex-grow p-3 border border-gray-600 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
            <li
              key={history.id}
              className="bg-black rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              {editingHistoryId === history.id ? (
                <div className="flex items-center p-4">
                  <input
                    type="text"
                    value={editingHistoryName}
                    onChange={(e) => setEditingHistoryName(e.target.value)}
                    className="flex-grow p-2 border border-gray-600 bg-black text-white"
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
                  <span className="text-white font-medium truncate flex-grow">
                    {history.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSelectChatHistory(history.id)}
                      className="p-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-gray-600"
                      title="Select Chat"
                    >
                      <FiCheck size={20} />
                    </button>
                    <button
                      onClick={() => handleStartEditHistory(history)}
                      className="p-2 text-yellow-500 hover:text-yellow-600 transition-colors duration-200 rounded-full hover:bg-gray-600"
                      title="Edit Chat Name"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteChatHistory(history.id)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-gray-600"
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
          <div className="text-center text-gray-400 mt-8">
            <TbHistory size={48} className="mx-auto mb-4" />
            <p>No chat histories yet. Create a new one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );

  const confirmReset = () => {
    resetConversation();
    setIsResetModalOpen(false);
  };

  const resetConversationWithConfirmation = () => {
    setIsResetModalOpen(true);
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: string) => {
    // Implement the logic for handling option selection
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''} transition-colors duration-500`} role="main" aria-labelledby="chatbot-title">
      
      {/* Main Chat Container */}
      <div className="flex-1 bg-white dark:bg-black transition-colors duration-200 overflow-hidden pt-16">
        <div className="mx-auto h-full flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center mb-6 sticky top-0 z-10 bg-white dark:bg-black py-4 px-6" role="banner">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-2xl font-bold text-black dark:text-white border-none"
              >
                Mazs AI Lab
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => handleOptionSelect('MazsAIPlus')}
                    >
                      <FiZap className="mr-2 text-yellow-500" />
                      Mazs AI
                      <span className="text-red-500 ml-2">(Mazs AI Website)</span>
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => handleOptionSelect('TemporaryChat')}
                    >
                      <FiClock className="mr-2 text-blue-500" />
                      Temporary chat
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <IconButton
                onClick={() => window.location.href = '/mazsapi'}
                title="API Info"
                ariaLabel="API Info"
              >
                <TbApi size={20} />
              </IconButton>
              <IconButton
                onClick={resetConversationWithConfirmation}
                title="Reset Conversation"
                ariaLabel="Reset Conversation"
              >
                <LuPaintbrush size={20} />
              </IconButton>
              <IconButton
                onClick={() => setShowChatHistory(!showChatHistory)}
                title="Chat History"
                ariaLabel="Chat History"
              >
                <TbHistory size={20} />
              </IconButton>
              <IconButton
                onClick={() => setShowSettings(!showSettings)}
                title="Settings"
                ariaLabel="Settings"
              >
                <RiSettings3Line size={20} />
              </IconButton>
            </div>
          </header>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-black rounded-lg shadow-xl">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto pt-1 space-y-4"
              style={{ fontSize: `${fontSize}px`, fontFamily: 'Inter, sans-serif' }}
            >
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    onContextMenu={(e: React.MouseEvent) => handleMessageContextMenu(e, index)}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.isUser
                          ? 'bg-white dark:bg-black text-black dark:text-white border border-dark dark:border-white'
                          : 'bg-white dark:bg-black text-black dark:text-white border border-dark dark:border-white'
                      } rounded-2xl p-4 shadow-md relative`}
                    >
                      {/* Message Header */}
                      <div className="flex items-center mb-2">
                        {message.isUser ? (
                          <>
                            {!isEditingUserName && (
                              <button
                                onClick={handleUserNameEdit}
                                className="text-white hover:text-gray-200 mr-2"
                              >
                                <FiEdit size={12} />
                              </button>
                            )}
                            <span className="text-sm font-semibold">
                              {isEditingUserName ? (
                                <input
                                  type="text"
                                  value={userName}
                                  onChange={handleUserNameChange}
                                  onBlur={handleUserNameSave}
                                  className="bg-transparent border-b border-blue-600 focus:outline-none"
                                />
                              ) : (
                                <>
                                  <span className="mr-1">{userAvatar}</span>
                                  {userName}
                                </>
                              )}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold">
                            {botName}
                          </span>
                        )}
                      </div>
                      {/* Message Body */}
                      <div className="text-base leading-normal">
                        {message.isUser || !message.isTyping
                          ? message.text
                          : message.text.slice(0, currentTypingIndex)}
                        {!message.isUser && message.isTyping && (
                          <span className="inline-block w-1 h-4 ml-1 bg-gray-100 animate-pulse"></span>
                        )}

                        {/* [Provided by Mazs AI] Link */}
                        {!message.isUser && !message.isTyping && (
                          <a
                            href="https://mazs-ai-lab.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 ml-2"
                          >
                            [Provided by Mazs AI]
                          </a>
                        )}
                      </div>
                      {/* Message Footer */}
                      <div className="mt-2 text-xs opacity-70 flex justify-between items-center">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {!message.isUser && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(message.text)}
                              className="p-1 rounded-full hover:bg-gray-600 transition-colors duration-200"
                              title="Copy to clipboard"
                            >
                              <FiCopy size={12} />
                            </button>
                            <button
                              onClick={() => regenerateResponseHandler(index)}
                              className="p-1 rounded-full hover:bg-gray-600 transition-colors duration-200"
                              title="Regenerate response"
                              disabled={isGenerating}
                            >
                              <FiRepeat />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-center items-center p-4">
                  <div className="flex space-x-2 ">
                    <div className="dot bg-black dark:bg-white"></div>
                    <div className="dot bg-black dark:bg-white"></div>
                    <div className="dot bg-black dark:bg-white"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="bg-gray-100 dark:bg-black p-4">
              {suggestions.length > 0 && messages.length === 1 && (
                <div className="mb-4 hidden sm:block">
                  <h3 className="text-sm font-semibold text-black dark:text-gray-300 mb-2">
                    Suggestions:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-white text-black dark:bg-black dark:text-white rounded-full text-sm hover:bg-gray-600 transition-colors duration-200 shadow-sm hover:shadow-md border border-dark dark:border-white"
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
                    <span className="inline-flex items-center p-2 rounded-lg bg-white dark:bg-black text-black dark:text-white text-sm shadow-md border border-dark dark:border-white">
                      <span className="font-medium">User is typing</span>
                      <span className="ml-2 typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </span>
                  </motion.div>
                )}
                <div className="flex items-center bg-white dark:bg-black rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300 border border-dark dark:border-white">
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
                          className="flex items-center bg-gray-600 px-2 py-1 text-sm rounded-full shadow-sm hover:bg-gray-500 transition-colors duration-200"
                        >
                          <span className="text-gray-400 mr-1">
                            {getFileIcon(file)}
                          </span>
                          <span className="text-gray-300 truncate max-w-[120px]">
                            {file.name} ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                          <button
                            onClick={() => clearAttachedFile(index)}
                            className="ml-1 text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none"
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
                      placeholder={
                        attachedFiles.length > 0
                          ? 'Add a message or send files...'
                          : 'Enter message to Mazs AI v1.3.5 Anatra'
                      }
                      className={`w-full p-2 bg-transparent text-black dark:text-white focus:outline-none resize-none min-h-[40px] max-h-[100px] ${
                        input.length > 1000 ? 'border-b-2 border-red-500' : ''
                      } scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}
                      style={{ fontSize: `${fontSize}px`, fontFamily: 'Inter, sans-serif' }}
                    />
                    <div className="flex justify-between items-center px-2 py-1 text-xs text-gray-400">
                      <span className={`font-medium ${input.length > 1000 ? 'text-red-500' : ''}`}>
                        {input.length}/1000 characters
                      </span>
                      {input.length > 900 && (
                        <span className="text-yellow-500 animate-pulse">
                          Approaching character limit
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 px-2">
                    <button
                      onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                      className={`p-2 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full ${
                        isRecording
                          ? 'text-red-500 animate-pulse'
                          : 'text-blue-500 hover:text-blue-600'
                      }`}
                      title={isRecording ? 'Stop recording' : 'Start voice recording'}
                    >
                      <FiMic />
                    </button>
                    <button
                      onClick={handleSend}
                      className={`p-2 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full ${
                        isGenerating ||
                        (!input.trim() && attachedFiles.length === 0) ||
                        input.length > 1000
                          ? 'text-gray-600 cursor-not-allowed'
                          : 'text-blue-500 hover:text-blue-600'
                      }`}
                      disabled={
                        isGenerating ||
                        (!input.trim() && attachedFiles.length === 0) ||
                        input.length > 1000
                      }
                      title="Send message"
                    >
                      <FiSend size={24} />
                    </button>
                  </div>
                </div>
                {showVoiceRecorder && renderVoiceRecorder()}
              </div>
              <div className="text-xs text-gray-400 text-center mt-2">
                <span className="font-medium">Mazs AI</span> can make mistakes. Please verify important information.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Other Components */}
      {showSettings && renderSettings()}
      {showChatHistory && renderChatHistory()}
      {isFAQOpen && renderFAQSection()}

      {/* Context Menu */}
      {showContextMenu && selectedMessageIndex !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="fixed bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden border border-gray-600"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <button
            onClick={() => deleteMessage(selectedMessageIndex)}
            className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 transition-colors duration-200"
          >
            <FiTrash2 className="mr-2" /> Delete Message
          </button>
          <button
            onClick={() => editMessage(selectedMessageIndex)}
            className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 transition-colors duration-200"
          >
            <FiEdit className="mr-2" /> Edit Message
          </button>
          <button
            onClick={() => shareMessage(selectedMessageIndex)}
            className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 transition-colors duration-200"
          >
            <FiShare className="mr-2" /> Share Message
          </button>
          <button
            onClick={closeContextMenu}
            className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 transition-colors duration-200"
          >
            <FiX className="mr-2" /> Cancel
          </button>
        </motion.div>
      )}

      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={confirmReset}
        title="Reset Conversation"
        message="Are you sure you want to reset the conversation? This action cannot be undone."
      />
    </div>
  );
};

export default MazsAIChat;