import React, { useState } from 'react';

const CookieNotifier: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 z-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">🍪 🍪 🍪</h3>
          <p className="text-sm mt-1">
(crunch crunch crunch) Hey the cookie taste great !
          </p>
        </div>
        <button
          className="ml-4 text-gray-400 hover:text-white"
          onClick={() => setVisible(false)}
        >
          ✕
        </button>
      </div>
      <hr className="my-2 border-gray-600" />
      <button
        className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-full shadow-md hover:from-purple-600 hover:to-pink-600"
        onClick={() => setVisible(false)}
      >
        Got it!
      </button>
    </div>
  );
};

export default CookieNotifier;
