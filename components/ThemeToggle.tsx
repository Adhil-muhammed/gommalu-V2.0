import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="text-green-500">
          {theme === 'light' ? <Sun className="w-6 h-6" strokeWidth={2}/> : <Moon className="w-6 h-6" strokeWidth={2}/>}
        </div>
        <span className="font-semibold text-slate-700 dark:text-slate-200">Theme</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={theme === 'dark'}
        onClick={toggleTheme}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
          theme === 'dark' ? 'bg-green-600' : 'bg-slate-300 dark:bg-slate-600'
        }`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
