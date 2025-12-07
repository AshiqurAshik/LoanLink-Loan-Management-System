import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('loan-theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('loan-theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-sm btn-circle border transition-colors
        ${theme === 'light' ? 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100' : 
        'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'}`}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
