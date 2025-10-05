import React, { useState, useEffect, useRef, Fragment } from 'react';
import type { InterviewLogItem } from '../types.ts';
import { useTranslations } from '../hooks/useTranslations.tsx';
import Loader from './Loader.tsx';
import Waveform from './Waveform.tsx';
import SparklesIcon from './icons/SparklesIcon.tsx';
import UserIcon from './icons/UserIcon.tsx';
import MicrophoneIcon from './icons/MicrophoneIcon.tsx';

interface ChatInterfaceProps {
    isInterviewMode: boolean;
    currentQuestion: string;
    interviewLog: InterviewLogItem[];
    isLoading: boolean;
    onSubmit: (input: string) => void;
}

const useTypewriter = (text: string, speed = 30) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        setDisplayText('');
        if (text) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) { setDisplayText(prev => prev + text.charAt(i)); i++; } 
                else { clearInterval(typingInterval); }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [text, speed]);
    return displayText;
};

const ChatInterface = ({ isInterviewMode, currentQuestion, interviewLog, isLoading, onSubmit }: ChatInterfaceProps) => {
  const { t, language } = useTranslations();
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState('');
  const recognitionRef = useRef<any>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const displayedQuestion = useTypewriter(currentQuestion);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        setMicError(t('voiceNotSupported'));
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === 'de' ? 'de-DE' : 'en-US';

    recognition.onstart = () => {
        setIsListening(true);
    };

    recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        setInputValue(transcript);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setMicError(t('micError'));
    };
    
    recognition.onend = () => {
        setIsListening(false);
    };
    
    recognitionRef.current = recognition;

    return () => {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognitionRef.current?.abort();
    };
  }, [language, t]);

  const handleMicClick = () => {
    if (!recognitionRef.current || isLoading) return;
    setMicError(''); 
    if (isListening) { 
        recognitionRef.current.stop(); 
    } else { 
        setInputValue(''); 
        recognitionRef.current.start();
    }
  };

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault();
    if (isListening) {
        recognitionRef.current?.stop();
    }
    onSubmit(inputValue); 
    setInputValue(''); 
  };
  
  useEffect(() => { endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [displayedQuestion, isLoading, interviewLog]);

  return (
    <div className="backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border h-full flex flex-col min-h-[50vh] max-h-[70vh]" style={{ backgroundColor: 'var(--color-card-background)', borderColor: 'var(--color-border)'}}>
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {interviewLog.map((item, index) => (
          <Fragment key={index}>
            <div className="flex items-start gap-3 fade-in"><div className="bg-white p-2 rounded-full shadow-md"><SparklesIcon className="w-6 h-6" style={{ color: 'var(--color-butter-yellow)'}} /></div><div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-butter-yellow)', color: 'var(--color-charcoal)'}}><p>{item.question}</p></div></div>
            <div className="flex items-start gap-3 justify-end fade-in"><div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-strawberry-pink)'}}><p className="text-white">{item.answer}</p></div><div className="p-2 rounded-full shadow-md" style={{backgroundColor: 'var(--color-subtle-background)'}}><UserIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)'}} /></div></div>
          </Fragment>
        ))}
        {displayedQuestion && !isLoading && (
          <div className="flex items-start gap-3 fade-in"><div className="bg-white p-2 rounded-full shadow-md"><SparklesIcon className="w-6 h-6" style={{ color: 'var(--color-butter-yellow)'}} /></div><div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-butter-yellow)', color: 'var(--color-charcoal)'}}><p>{displayedQuestion}<span className="typewriter-cursor"></span></p></div></div>
        )}
        {isLoading && (<div className="flex items-start gap-3 fade-in"><div className="bg-white p-2 rounded-full shadow-md"><SparklesIcon className="w-6 h-6" style={{ color: 'var(--color-butter-yellow)'}} /></div><div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-butter-yellow)'}}><Loader /></div></div>)}
        <div ref={endOfMessagesRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="relative">
          <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }} placeholder={isLoading ? t('waitingForChef') : isListening ? t('listeningPlaceholder') : (isInterviewMode ? t('typeAnswer') : t('describeGoal'))} disabled={isLoading} className={`w-full p-4 pr-32 rounded-xl focus:ring-2 focus:ring-[--color-strawberry-pink] focus:outline-none resize-none shadow-inner border transition-all ${isListening ? 'pl-16' : ''}`} style={{ backgroundColor: 'var(--color-input-background)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }} rows={3}/>
          {isListening && <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none w-12"><Waveform /></div>}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button type="button" onClick={handleMicClick} disabled={isLoading || !recognitionRef.current} className={`p-2 rounded-full transform transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${isListening ? 'bg-[--color-strawberry-pink] text-white animate-pulse-mic' : 'bg-[var(--color-button-inactive-bg)] text-[var(--color-button-inactive-text)]'}`} aria-label={isListening ? t('stopListening') : t('startListening')}><MicrophoneIcon className="w-6 h-6" /></button>
            <button type="submit" disabled={isLoading || !inputValue.trim()} className="font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5" style={{ backgroundColor: 'var(--color-strawberry-pink)', color: 'white', height: '48px' }}>{t('send')}</button>
          </div>
        </div>
        {micError && <p className="text-xs text-red-500 text-center mt-2">{micError}</p>}
      </form>
    </div>
  );
};

export default ChatInterface;