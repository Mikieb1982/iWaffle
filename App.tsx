import React, { useState, useEffect } from 'react';
import type { AppMode, StartConfig, PromptData, ErrorData, InterviewLogItem } from './types.ts';
import { generatePrompt, startOrContinueInterview } from './services/geminiService.ts';
import { useTranslations } from './hooks/useTranslations.tsx';

import WelcomeScreen from './components/WelcomeScreen.tsx';
import ChatInterface from './components/ChatInterface.tsx';
import ResultCard from './components/ResultCard.tsx';
import ErrorDisplay from './components/ErrorDisplay.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';
import LogoIcon from './components/icons/LogoIcon.tsx';
import LanguageSelector from './components/LanguageSelector.tsx';


function App() {
  const { t, language } = useTranslations();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [view, setView] = useState('welcome'); // welcome, chat, result
  const [mode, setMode] = useState<AppMode>('interview');
  const [targetAI, setTargetAI] = useState('Gemini AI');
  const [isLoading, setIsLoading] = useState(false);
  const [appOutput, setAppOutput] = useState<PromptData | ErrorData | null>(null);
  const [interviewLog, setInterviewLog] = useState<InterviewLogItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [logoAnimationKey, setLogoAnimationKey] = useState(0);

  const initialInterviewQuestion = t('initialQuestion');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  
  useEffect(() => {
    if (isLoading || view === 'result') { setLogoAnimationKey(prev => prev + 1); }
  }, [isLoading, view]);

  const handleThemeToggle = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const handleReset = () => {
    setAppOutput(null);
    setInterviewLog([]);
    setCurrentQuestion("");
    setIsLoading(false);
    setView('welcome');
  };
  
  const handleStart = (config: StartConfig) => {
    setMode(config.mode);
    setTargetAI(config.targetAI);
    if (config.mode === 'interview') {
        setCurrentQuestion(initialInterviewQuestion);
    }
    setView('chat');
  };

  const handleChatSubmit = async (userInput: string) => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setAppOutput(null);

    if (mode === 'simple') {
      const result = await generatePrompt(userInput, targetAI, language);
      setAppOutput(result.content);
      setView('result');
    } else {
      const newLogItem = { question: currentQuestion, answer: userInput };
      const updatedLog = [...interviewLog, newLogItem];
      setInterviewLog(updatedLog);

      const result = await startOrContinueInterview(updatedLog, targetAI, language);
      if (result.type === 'question') {
        setCurrentQuestion(result.question);
      } else {
        setAppOutput(result.content);
        setView('result');
      }
    }
    setIsLoading(false);
  };

  const renderContent = () => {
    if (appOutput && 'error' in appOutput && appOutput.error) {
        return <ErrorDisplay data={appOutput} onReset={handleReset} />;
    }

    switch (view) {
        case 'welcome': return <WelcomeScreen onStart={handleStart} />;
        case 'chat': return <ChatInterface isInterviewMode={mode === 'interview'} currentQuestion={currentQuestion} interviewLog={interviewLog} isLoading={isLoading} onSubmit={handleChatSubmit} />;
        case 'result': return appOutput ? <ResultCard data={appOutput as PromptData} onReset={handleReset} /> : null;
        default: return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <header className="py-4 px-6 md:px-8 flex justify-between items-center border-b sticky top-0 z-10 backdrop-blur-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'rgba(var(--color-background), 0.8)' }}>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <div className="flex items-center gap-3">
            <LogoIcon key={logoAnimationKey} className="w-10 h-10 animate-jiggle" />
            <h1 className="text-2xl font-bold tracking-tight hidden sm:block" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-display)'}}>iWaffle</h1>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      </header>

      <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
