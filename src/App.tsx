import React, { useState, useEffect } from 'react';
import SimpleMode from './components/SimpleMode';
import ComplexMode from './components/ComplexMode';
import ChatInterface from './components/ChatInterface';
import LogoIcon from './components/icons/LogoIcon';
import ThemeToggle from './components/ThemeToggle';
import { GenerationMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<GenerationMode>('simple');

  useEffect(() => {
    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const renderMode = () => {
    switch (mode) {
      case 'simple':
        return <SimpleMode />;
      case 'complex':
        return <ComplexMode />;
      case 'chat':
        return <ChatInterface />;
      default:
        return <SimpleMode />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 font-sans">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <LogoIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">Gemini API Playground</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setMode('simple')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${mode === 'simple' ? 'bg-white dark:bg-gray-700 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
                >
                  Simple
                </button>
                <button
                  onClick={() => setMode('complex')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${mode === 'complex' ? 'bg-white dark:bg-gray-700 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
                >
                  JSON Output
                </button>
                <button
                  onClick={() => setMode('chat')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${mode === 'chat' ? 'bg-white dark:bg-gray-700 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
                >
                  Chat
                </button>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderMode()}
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        Powered by Google Gemini
      </footer>
    </div>
  );
};

export default App;
