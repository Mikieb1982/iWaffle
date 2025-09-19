import React, { useState } from 'react';
import { ComplexMode } from './components/ComplexMode';
import { LogoIcon } from './components/icons/LogoIcon';
import { SimpleMode } from './components/SimpleMode';
import { ThemeToggle } from './components/ThemeToggle';
import { TabButton } from './components/TabButton';

// fix: Removed Theme import and all theme-related state management.
// This logic is encapsulated within the ThemeToggle component, and its duplication here caused errors.
export const App = () => {
  const [activeTab, setActiveTab] = useState('simple');

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
      <div className="container mx-auto p-4 max-w-3xl flex flex-col h-screen">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">iWaffle</h1>
          </div>
          {/* fix: Removed props from ThemeToggle as it manages its own state. */}
          <ThemeToggle />
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