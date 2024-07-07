import React, { useState, useRef, useEffect } from 'react';
import "../components/st.css";

const responses: { [key: string]: string } = {
  greeting: "Hello! How can I assist you today?",
  // ... (other responses)
};

const patterns: { [key: string]: RegExp } = {
  greeting: /\b(hi|hello|hey|hola)\b/i,
  // ... (other patterns)
};

interface ChatWidgetProps {
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const newMessages = [...messages, { sender: 'user', text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    const response = getResponse(inputValue);
    if (response) {
      setMessages([...newMessages, { sender: 'bot', text: response }]);
    }
  };

  const getResponse = (input: string) => {
    for (const key in patterns) {
      if (patterns[key].test(input)) {
        return responses[key];
      }
    }
    return "I'm sorry, I didn't understand that. Can you please rephrase?";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden hidden md:block">
      <div className="flex flex-col h-[400px]">
        <div className="px-4 py-3 border-b dark:border-zinc-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Mazs AI v0.1.5
          </h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'bot' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`${
                  message.sender === 'bot'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-white'
                } px-4 py-2 rounded-lg max-w-xs`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-4 py-3 border-t dark:border-zinc-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
