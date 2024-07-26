import React, { useState, useEffect } from 'react';

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

const CookieNotifier: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: false,
    marketing: false,
    necessary: true,
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
      setVisible(false);
    }
  }, []);

  const saveCookiePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setVisible(false);
  };

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
      {customizing ? (
        <>
          <div className="mt-2">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={preferences.necessary}
                onChange={() => setPreferences({...preferences, necessary: true})}
                disabled
                className="mr-2"
              />
              Necessary (Always active)
            </label>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                className="mr-2"
              />
              Analytics
            </label>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                className="mr-2"
              />
              Marketing
            </label>
          </div>
          <button
            className="mt-4 w-full py-2 rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            onClick={saveCookiePreferences}
          >
            Save Preferences
          </button>
        </>
      ) : (
        <>
          <button
            className="mt-4 w-full py-2 rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            onClick={() => setVisible(false)}
          >
            Take A Bite of the Cookie 🍪
          </button>
          <button
            className="mt-2 w-full py-2 rounded-full shadow-md text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
            onClick={() => setCustomizing(true)}
          >
            Customize Cookie 🛠️
          </button>
        </>
      )}
    </div>
  );
};

export default CookieNotifier;
