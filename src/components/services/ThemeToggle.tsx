import React, { useState, useEffect } from 'react';
import { TbMoonStars, TbSunset2 } from 'react-icons/tb';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.theme || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className="text-xl">
      {theme === 'light' ? <TbMoonStars className="text-purple-500" /> : <TbSunset2 className="text-yellow-500" />}
    </button>
  );
}

export default ThemeToggle;