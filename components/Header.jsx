'use client'
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { useState, useEffect } from "react";
import { useI18n } from "../app/i18n";
import { Settings } from "lucide-react";
import { SettingsDrawer } from "./SettingDrawer";
import { Sun, Moon } from 'lucide-react';

export function Header() {
  const { locale, setLocale, t } = useI18n()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
    <div
      className="fixed z-10 h-14 w-full border-b bg-white dark:bg-gray-800 dark:border-gray-700 first-letter:shadow-sm"
    >
      <header className="flex justify-between items-center w-full mt-1 border-b-1 pb-0 sm:px-4 px-2">
        <Link href="/" className="flex space-x-3">
          <h1 className="sm:text-4xl text-2xl ml-2 tracking-tight font-extralight flex items-center dark:text-white">
            Formulas AI
          </h1>
        </Link>
        <div className="flex items-center space-x-2">
          <LanguageSelector language={locale} setLanguage={setLocale} />
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
            aria-label={t('settings.title') || '设置'}
          >
            <Settings className="h-5 w-5" />
          </button>
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
        </div>
      </header>

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {isSettingsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}