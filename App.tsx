import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { LogoIcon } from './components/icons/LogoIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { MessageIcon } from './components/icons/MessageIcon';
import { TrashIcon } from './components/icons/TrashIcon';
import { ChatInterface } from './components/ChatInterface';
import { SimpleMode } from './components/SimpleMode';
import { ComplexMode } from './components/ComplexMode';
import { generatePrompt, startOrContinueInterview } from './services/geminiService';
import type { AppOutput, ErrorOutput, InterviewLogItem, PromptOutput, ComplexOutput } from './types';

type Mode = 'simple' | 'interview';
type TargetAI = 'Gemini AI' | 'ChatGPT-5';

const initialQuestion = "Waffle, bla bla, waffle... what's the secret sauce for your prompt today?";

const ErrorDisplay: React.FC<{ data: ErrorOutput }> = ({ data }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
    <p className="font-bold">{data.message}</p>
    <ul className="mt-2 list-disc list-inside">
      {data.suggestions.map((suggestion, index) => (
        <li key={index}>{suggestion}</li>
      ))}
    </ul>
  </div>
);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });
  
  const [mode, setMode] = useState<Mode>('interview');
  const [targetAI, setTargetAI] = useState<TargetAI>('Gemini AI');
  const [isLoading, setIsLoading] = useState(false);
  const [appOutput, setAppOutput] = useState<AppOutput | null>(null);
  const [interviewLog, setInterviewLog] = useState<InterviewLogItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [logoAnimationKey, setLogoAnimationKey] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);
  
  useEffect(() => {
    // This effect triggers the logo animation by changing the key of the LogoIcon
    // component, which forces it to re-mount and re-play its CSS animation.
    const shouldAnimate = isLoading || (appOutput && !('error' in appOutput && appOutput.error));
    if (shouldAnimate) {
      setLogoAnimationKey(prevKey => prevKey + 1);
    }
  }, [isLoading, appOutput]);


  const handleThemeToggle = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleReset = () => {
    setAppOutput(null);
    setInterviewLog([]);
    setCurrentQuestion(initialQuestion);
    setIsLoading(false);
  };
  
  const handleChatSubmit = async (userInput: string) => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    setAppOutput(null);

    if (mode === 'simple') {
      const result = await generatePrompt(userInput, targetAI);
      setAppOutput(result.content);
    } else { // interview mode
      const newLogItem: InterviewLogItem = {
        question: currentQuestion,
        answer: userInput,
      };
      const updatedLog = [...interviewLog, newLogItem];
      setInterviewLog(updatedLog);

      const result = await startOrContinueInterview(updatedLog, targetAI);
      if (result.type === 'question') {
        setCurrentQuestion(result.question);
      } else {
        setAppOutput(result.content);
      }
    }
    setIsLoading(false);
  };

  const renderOutput = () => {
    if (!appOutput) return null;

    if ('error' in appOutput && appOutput.error) {
        return <ErrorDisplay data={appOutput} />;
    } else if ('interview_log' in appOutput) {
        return <ComplexMode data={appOutput as ComplexOutput} />;
    } else {
        return <SimpleMode data={appOutput as PromptOutput} />;
    }
  };

  const resetAndSetMode = (newMode: Mode) => {
    if (mode !== newMode) {
      handleReset();
      setMode(newMode);
    }
  }

  return (
    <div className="min-h-screen font-sans overflow-hidden" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <header className="py-4 px-6 md:px-8 flex justify-between items-center border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3">
          <LogoIcon key={logoAnimationKey} className="w-10 h-10 animate-jiggle" />
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-heading)'}}>iWaffle: Prompt Chef</h1>
        </div>
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      </header>

      <main className="py-4 px-4 md:px-8 max-w-4xl mx-auto">
        {appOutput ? (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>Your Prompt is Ready!</h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--color-button-secondary)', color: 'var(--color-text-primary)'}}
              >
                <TrashIcon className="w-5 h-5"/>
                Start Over
              </button>
            </div>
            {renderOutput()}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Mode Selection */}
              <div className="rounded-xl border p-4" style={{ borderColor: 'var(--color-border)'}}>
                <label className="font-bold text-sm block mb-2" style={{ color: 'var(--color-heading)'}}>Cooking Mode</label>
                <div className="flex bg-[--color-subtle-background] rounded-lg p-1">
                  <button onClick={() => resetAndSetMode('simple')} className={`w-1/2 p-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${mode === 'simple' ? 'bg-[--color-strawberry-pink] text-white shadow' : 'hover:bg-[--color-input-background]'}`}>
                     <SparklesIcon className="w-4 h-4"/> Simple
                  </button>
                  <button onClick={() => resetAndSetMode('interview')} className={`w-1/2 p-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${mode === 'interview' ? 'bg-[--color-strawberry-pink] text-white shadow' : 'hover:bg-[--color-input-background]'}`}>
                    <MessageIcon className="w-4 h-4" /> Interview
                  </button>
                </div>
              </div>
               {/* Target AI Selection */}
              <div className="rounded-xl border p-4" style={{ borderColor: 'var(--color-border)'}}>
                 <label className="font-bold text-sm block mb-2" style={{ color: 'var(--color-heading)'}}>Optimize For</label>
                 <div className="flex bg-[--color-subtle-background] rounded-lg p-1">
                    <button onClick={() => setTargetAI('Gemini AI')} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${targetAI === 'Gemini AI' ? 'bg-[--color-butter-yellow] text-black shadow' : 'hover:bg-[--color-input-background]'}`}>
                       Gemini AI
                    </button>
                     <button onClick={() => setTargetAI('ChatGPT-5')} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${targetAI === 'ChatGPT-5' ? 'bg-[--color-butter-yellow] text-black shadow' : 'hover:bg-[--color-input-background]'}`}>
                       ChatGPT-5
                    </button>
                 </div>
              </div>
            </div>

            <ChatInterface
              isInterviewMode={mode === 'interview'}
              currentQuestion={currentQuestion}
              interviewLog={interviewLog}
              isLoading={isLoading}
              onSubmit={handleChatSubmit}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;