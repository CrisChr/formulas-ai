'use client'
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function Footer() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 sm:mb-0 mb-3 dark:bg-gray-800 dark:text-white">
      <div>
        Powered by{" "}
        <a
          href="https://www.deepseek.com/"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          DeepSeek AI{" "}
        </a>
        and{" "}
        <a
          href="https://sdk.vercel.ai/docs"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel AI SDK
        </a>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="切换暗黑模式"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </footer>
  );
}
