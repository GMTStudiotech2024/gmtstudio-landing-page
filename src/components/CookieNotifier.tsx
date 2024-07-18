import React, { useState } from 'react';

const CookieNotifier: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 p-4 w-80 z-50 rounded-lg shadow-2xl bg-gradient-radial bg-dark-blue backdrop-filter backdrop-blur-lg border border-solid border-white border-opacity-30">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-black">🍪 🍪 🍪</h3>
          <p className="text-sm mt-1 text-white">
            (crunch crunch crunch) Hey the cookie tastes great! Want a bite? (continue Crunching)
          </p>
        </div>
        <button
          className="ml-4 text-gray-800 hover:text-black"
          onClick={() => setVisible(false)}
        >
          ✕
        </button>
      </div>
      <hr className="my-2 border-gray-300" />
      <button
        className="mt-4 w-full py-2 rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
        onClick={() => setVisible(false)}
      >
        Take A Bite of the Cookie 🍪
      </button>
    </div>
  );
};

export default CookieNotifier;
