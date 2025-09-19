import React, { useState, useEffect } from 'react';
import { ComplexMode } from './components/ComplexMode';
import { LogoIcon } from './components/icons/LogoIcon';
import { SimpleMode } from './components/SimpleMode';
import { ThemeToggle } from './components/ThemeToggle';
import type { Theme } from './types';

interface TabButtonProps {
  id: string;
  label: string;
  activeTab: string;
  onClick: (id: string) => void;
}

const TabButton = React.memo(({ id, label, activeTab, onClick }: TabButtonProps) => (
  <button
    onClick={() => onClick(id)}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
      activeTab === id
        ? 'bg-accent text-white'
        : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5'
    }`}
  >
    {label}
  </button>
));

export const App = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const [activeTab, setActiveTab] = useState('simple');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
      <div className="container mx-auto p-4 max-w-3xl flex flex-col h-screen">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">iWaffle</h1>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>

        <main className="flex-grow flex flex-col">
           <div className="flex justify-center mb-6">
              <div className="bg-bg-secondary p-1 rounded-full flex gap-2 border border-border-color shadow-sm">
                <TabButton id="simple" label="Simple Mode" activeTab={activeTab} onClick={setActiveTab} />
                <TabButton id="complex" label="Complex Mode" activeTab={activeTab} onClick={setActiveTab} />
              </div>
            </div>

          {activeTab === 'simple' ? <SimpleMode /> : <ComplexMode />}
        </main>
      </div>
    </div>
  );
};
